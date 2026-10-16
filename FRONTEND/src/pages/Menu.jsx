import { useCallback, useMemo, useState, useRef, forwardRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { FiChevronLeft, FiChevronRight, FiHeart, FiShuffle, FiVolume2, FiVolumeX } from "react-icons/fi";

import { toast } from "react-toastify";
import { useMenu } from "../hooks/useMenu";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { getMenuItemCustomizations, prefetchCustomizations } from "../services/menuService";
import coverPhoto from "../assets/images/menu/home/photo4.jpg";
import { Skeleton, EmptyState, RetryBanner } from "../components/feedback/StateViews";
import CustomizationModal from "../components/menu/CustomizationModal";
import SurpriseModal from "../components/menu/SurpriseModal";
import DishModal from "../components/menu/DishModal";
import Stamp from "../components/fun/Stamp";
import GlassLoader from "../components/fun/GlassLoader";
import ScribbleUnderline from "../components/fun/ScribbleUnderline";
import { loadFavorites, saveFavorites } from "../utils/favorites";
import { isSoundOn, playFlip, setSoundOn } from "../utils/sound";

const isVeg = (item) => Boolean(item.is_veg ?? item.vegetarian ?? item.is_vegetarian);
const itemId = (item) => item.id || item._id;
const isQuick = (item) => {
  const minutes = Number(item.preparation_time);
  return minutes > 0 && minutes <= 15;
};

const FILTER_CHIPS = [
  ["veg", "Veg"],
  ["quick", "Quick bites"],
  ["budget", "Under ₹300"],
];

const chipClass = (active) =>
  `shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors ${
    active
      ? "border-[#C5A059] bg-[#C5A059] text-[#2C2523]"
      : "border-[#FAF4E5]/25 text-[#FAF4E5]/80 hover:border-[#C5A059] hover:text-[#FAF4E5]"
  }`;

const ThumbImg = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-6 w-6 shrink-0 rounded-full border border-gold-deep/30 object-cover sm:h-8 sm:w-8"
    />
  );
};

const VintageCover = forwardRef(({ coverImg }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col justify-between bg-paper-2 p-3 min-[390px]:p-4 sm:p-6 shadow-2xl select-none border-r border-ink/20 overflow-hidden"
      style={{ boxSizing: "border-box" }}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-4 sm:w-6 bg-gradient-to-l from-black/25 to-transparent" />

      <div className="flex h-full w-full flex-col items-center justify-between border-2 border-gold-deep/40 p-2.5 sm:p-4">
        <div className="text-center">
          <p className="font-['Playfair_Display'] text-[9px] min-[390px]:text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-deep">
            Welcome To
          </p>
          <h2 className="font-['Great_Vibes'] text-2xl min-[390px]:text-3xl sm:text-4xl text-ink">Whiskey & Wheat</h2>
        </div>

        <div className="my-auto flex flex-col items-center text-center">
          <h1 className="font-['Playfair_Display'] text-3xl min-[390px]:text-4xl sm:text-5xl font-black uppercase tracking-[0.15em] sm:tracking-widest text-ink">
            MENU
          </h1>
          <p className="mt-1 font-['Great_Vibes'] text-sm min-[390px]:text-base sm:text-xl text-gold-deep leading-tight">
            Good food. Great vibes. Wild memories.
          </p>

          <div className="mt-3 min-[390px]:mt-4 sm:mt-5 h-[34vw] w-[34vw] max-h-48 max-w-48 min-h-28 min-w-28 overflow-hidden rounded-sm border-2 border-gold-deep/30 shadow-lg">
            <img
              src={coverImg || coverPhoto}
              alt="Restaurant Cover"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="font-['Montserrat'] text-[7px] min-[390px]:text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-widest text-ink/70">
            Let the good times begin
          </p>
        </div>
      </div>
    </div>
  );
});

VintageCover.displayName = "VintageCover";

const Page = forwardRef(({ pageNum, sections, onAddToCart, onOpenDetails, onToggleFavorite, favorites, isMobile }, ref) => {
  const isEven = pageNum % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex h-full w-full flex-col justify-between bg-paper-2 px-3 min-[390px]:px-4 sm:px-7 py-3 min-[390px]:py-4 sm:py-6 select-none shadow-2xl overflow-hidden ${
        isEven ? "border-l border-ink/15" : "border-r border-ink/15"
      }`}
      style={{ boxSizing: "border-box" }}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 ${
          isEven ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"
        } w-4 sm:w-6 from-black/20 to-transparent`}
      />

      <div className={`${isMobile ? "space-y-3" : "space-y-6"} overflow-hidden w-full min-w-0`}>
        {sections?.map((sec, idx) => (
          <div key={idx} className={`${isMobile ? "space-y-2" : "space-y-3"} min-w-0`}>
            {sec.categoryName && (
              <div className="text-center">
                <h2 className="font-['Playfair_Display'] text-xs sm:text-base font-extrabold uppercase tracking-[0.12em] sm:tracking-widest text-ink">
                  {sec.categoryName}
                </h2>
                <div className="mx-auto mt-1 h-[1px] w-12 bg-[#8C6D3B]/50" />
              </div>
            )}

            <div className={`${isMobile ? "space-y-2" : "space-y-3"} w-full`}>
              {sec.items?.map((item) => {
                const id = itemId(item);
                const favorite = favorites.includes(id);
                const unavailable = item.is_available === false;

                return (
                  <div key={id} className="group relative w-full min-w-0">
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <ThumbImg src={item.image} alt={item.name} />
                        <span
                          className={`inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center border p-[1px] ${
                            isVeg(item) ? "border-green-800" : "border-red-800"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${isVeg(item) ? "bg-green-800" : "bg-red-800"}`}
                          />
                        </span>
                        <h3 className="min-w-0 font-['Playfair_Display'] text-[10px] min-[390px]:text-[11px] sm:text-[13px] font-bold text-ink">
                          <button
                            type="button"
                            onClick={() => onOpenDetails(item)}
                            className="block max-w-full truncate text-left hover:underline"
                          >
                            {item.name}
                          </button>
                        </h3>
                      </div>

                      <span className="font-['Playfair_Display'] text-[10px] min-[390px]:text-[11px] sm:text-[13px] font-bold text-ink shrink-0 whitespace-nowrap">
                        ₹{Number(item.price || 0).toFixed(0)}
                      </span>
                    </div>

                    {item.description && (
                      <p className="mt-0.5 font-['Montserrat'] text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-tight text-ink/70 line-clamp-2 pr-1">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-0.5 flex items-center gap-2">
                      <button
                        type="button"
                        disabled={unavailable}
                        onClick={() => onAddToCart(item)}
                        onMouseEnter={() => prefetchCustomizations(id)}
                        onFocus={() => prefetchCustomizations(id)}
                        className="text-[7px] min-[390px]:text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-[0.08em] sm:tracking-wider text-gold-deep hover:underline hover:text-ink whitespace-nowrap disabled:opacity-40 disabled:no-underline"
                      >
                        + Add to order
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(id)}
                        aria-pressed={favorite}
                        aria-label={favorite ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
                        className="p-0.5 text-ink/50 hover:text-ember"
                      >
                        <FiHeart
                          key={favorite ? "on" : "off"}
                          className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${favorite ? "badge-pop fill-current text-ember" : ""}`}
                        />
                      </button>
                      {unavailable && <Stamp tone="ember" className="text-[6px] sm:text-[7px]">Sold out</Stamp>}
                      {!unavailable && isQuick(item) && <Stamp tone="sage" className="text-[6px] sm:text-[7px]">Quick</Stamp>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1.5 sm:mt-2 border-t border-ink/15 pt-1.5 sm:pt-2 text-center shrink-0">
        <p className="font-['Montserrat'] text-[6.5px] min-[390px]:text-[7px] sm:text-[8.5px] leading-tight text-ink/50">
          Price excludes gov tax. GST extra as applicable.
        </p>
      </div>
    </div>
  );
});

Page.displayName = "Page";

const Menu = () => {
  const requireAuth = useRequireAuth();
  const bookRef = useRef(null);

  const handleMenuError = useCallback((error) => {
    toast.error(error.message || "Couldn't load the menu.", { toastId: "menu-error" });
  }, []);

  const { items: menuItems, status: menuStatus, refetch: refetchMenu } = useMenu({
    onError: handleMenuError,
  });

  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    if (menuStatus !== "loading") return undefined;
    const timer = setTimeout(() => setSlowLoad(true), 4000);
    return () => {
      clearTimeout(timer);
      setSlowLoad(false);
    };
  }, [menuStatus]);

  const [activeItem, setActiveItem] = useState(null);
  const [customizations, setCustomizations] = useState([]);
  const [loadingCustomizations, setLoadingCustomizations] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({ veg: false, quick: false, budget: false, favorites: false });
  const [favorites, setFavorites] = useState(loadFavorites);
  const [soundOn, setSoundState] = useState(isSoundOn);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1024 : window.innerWidth
  );

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const handleResize = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      timer = setTimeout(() => {
        frame = requestAnimationFrame(() => setViewportWidth(window.innerWidth));
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = viewportWidth < 768;
  const isSmallMobile = viewportWidth < 390;
  const isTablet = !isMobile && viewportWidth < 1024;

  const bookWidth = isMobile
    ? Math.max(280, Math.min(430, viewportWidth - (isSmallMobile ? 24 : 32)))
    : viewportWidth < 1024
      ? Math.max(300, Math.min(400, Math.floor((viewportWidth - 48) / 2)))
      : 430;

  const bookHeight = isMobile
    ? Math.max(430, Math.min(570, Math.round(bookWidth * 1.42)))
    : viewportWidth < 1024
      ? 540
      : 580;

  const visibleItems = useMemo(() => {
    if (!Array.isArray(menuItems)) return null;
    return menuItems.filter((item) => {
      if (filters.veg && !isVeg(item)) return false;
      if (filters.quick && !isQuick(item)) return false;
      if (filters.budget && Number(item.price) > 300) return false;
      if (filters.favorites && !favorites.includes(itemId(item))) return false;
      return true;
    });
  }, [menuItems, filters, favorites]);

  const pages = useMemo(() => {
    if (!visibleItems || visibleItems.length === 0) return [];

    const MAX_UNITS_PER_PAGE = isMobile ? (isSmallMobile ? 5 : 6) : isTablet ? 8 : 10;
    const pagesList = [];

    let currentPageSections = [];
    let currentUnits = 0;

    const activeCategories = Array.from(
      new Set(visibleItems.map((item) => item.category_name || item.category || "General"))
    ).map((cat) => ({ id: cat, name: cat }));

    activeCategories.forEach((cat) => {
      const catItems = visibleItems.filter(
        (item) =>
          item.category === cat.id ||
          item.category_id === cat.id ||
          item.category_name === cat.name ||
          item.category === cat.name
      );

      if (catItems.length === 0) return;

      let remainingItems = [...catItems];
      let isFirstChunk = true;

      while (remainingItems.length > 0) {
        const categoryHeaderCost = isFirstChunk ? 2 : 0;
        const availableUnits = MAX_UNITS_PER_PAGE - currentUnits - categoryHeaderCost;

        if (availableUnits <= 1) {
          pagesList.push({ sections: currentPageSections });
          currentPageSections = [];
          currentUnits = 0;
          continue;
        }

        const chunk = remainingItems.slice(0, availableUnits);
        remainingItems = remainingItems.slice(availableUnits);

        currentPageSections.push({
          categoryName: isFirstChunk ? cat.name : "",
          items: chunk,
        });

        currentUnits += chunk.length + categoryHeaderCost;

        if (currentUnits >= MAX_UNITS_PER_PAGE) {
          pagesList.push({ sections: currentPageSections });
          currentPageSections = [];
          currentUnits = 0;
        }

        isFirstChunk = false;
      }
    });

    if (currentPageSections.length > 0) {
      pagesList.push({ sections: currentPageSections });
    }

    if (pagesList.length % 2 === 0) {
      pagesList.push({ sections: [] });
    }

    return pagesList;
  }, [visibleItems, isMobile, isSmallMobile, isTablet]);

  const handleAddToCart = useCallback(
    (item) => {
      requireAuth(async () => {
        setActiveItem(item);
        setLoadingCustomizations(true);
        try {
          const data = await getMenuItemCustomizations(itemId(item));
          setCustomizations(Array.isArray(data) ? data : data?.results || []);
        } catch (error) {
          toast.error(error.message || "Couldn't load customization options.");
          setCustomizations([]);
        } finally {
          setLoadingCustomizations(false);
        }
      });
    },
    [requireAuth]
  );

  const toggleFavorite = useCallback(
    (id) => {
      const exists = favorites.includes(id);
      const next = exists ? favorites.filter((value) => value !== id) : [...favorites, id];
      setFavorites(next);
      saveFavorites(next);
      toast.info(exists ? "Removed from your favourites." : "Saved to your favourites.", {
        toastId: "favorite-toggle",
        autoClose: 1500,
      });
    },
    [favorites]
  );

  const toggleFilter = (key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  const clearFilters = () => setFilters({ veg: false, quick: false, budget: false, favorites: false });

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundState(next);
    toast.info(next ? "Page-flip sound on." : "Page-flip sound off.", { toastId: "sound-toggle", autoClose: 1500 });
    if (next) playFlip();
  };

  const surprisePool = useMemo(
    () => (visibleItems || []).filter((item) => item.is_available !== false),
    [visibleItems]
  );

  const openSurprise = () => {
    if (surprisePool.length === 0) {
      toast.info("Nothing to pick from yet. Try clearing your filters.", { toastId: "surprise-empty" });
      return;
    }
    setSurpriseOpen(true);
  };

  const categoryTargets = useMemo(() => {
    const list = [];
    pages.forEach((pageData, index) => {
      pageData.sections.forEach((section) => {
        if (section.categoryName) list.push({ name: section.categoryName, page: index + 1 });
      });
    });
    return list;
  }, [pages]);

  const activeCategory = categoryTargets.filter((entry) => entry.page <= currentPage + 1).at(-1)?.name;

  const jumpToCategory = (page) => bookRef.current?.pageFlip()?.flip(page);

  useEffect(() => {
    bookRef.current?.pageFlip()?.turnToPage(0);
  }, [isMobile, isTablet, filters]);

  const handleFlip = useCallback((event) => {
    playFlip();
    setCurrentPage(event.data);
  }, []);

  const prevFlip = () => bookRef.current?.pageFlip()?.flipPrev();
  const nextFlip = () => bookRef.current?.pageFlip()?.flipNext();

  const bookPages = useMemo(
    () => [
      <VintageCover key="cover" coverImg={coverPhoto} />,
      ...pages.map((pageData, idx) => (
        <Page
          key={idx}
          pageNum={idx + 2}
          sections={pageData.sections}
          onAddToCart={handleAddToCart}
          onOpenDetails={setDetailItem}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          isMobile={isMobile}
        />
      )),
    ],
    [pages, handleAddToCart, toggleFavorite, favorites, isMobile]
  );

  const hasPages = pages.length > 0;
  const hasFilters = Object.values(filters).some(Boolean);
  const noMatches = menuStatus === "success" && !hasPages && hasFilters;
  const isEmpty = menuStatus === "empty" || (menuStatus === "success" && !hasPages && !hasFilters);
  const showToolbar = menuStatus === "success" || noMatches;

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#0a0f08] text-[#FAF4E5]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(197,160,89,0.18), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(73,19,19,0.45), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full">
        <section
          className="relative flex h-[24vh] min-h-[145px] max-h-[250px] w-full items-center justify-center sm:h-[30vh] sm:min-h-[180px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(10,15,8,0.9)), radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.35), transparent 70%)",
          }}
        >
          <h1 className="font-['Great_Vibes'] text-4xl min-[390px]:text-5xl text-[#FAF4E5] sm:text-6xl drop-shadow-2xl">
            <ScribbleUnderline>Our Menu</ScribbleUnderline>
          </h1>
        </section>

        {showToolbar && (
          <div className="sticky top-16 z-30 border-y border-[#FAF4E5]/10 bg-[#0a0f08]/80 backdrop-blur-md sm:top-20">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 py-3 sm:px-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {FILTER_CHIPS.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={filters[key]}
                    onClick={() => toggleFilter(key)}
                    className={chipClass(filters[key])}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  aria-pressed={filters.favorites}
                  onClick={() => toggleFilter("favorites")}
                  className={`${chipClass(filters.favorites)} inline-flex items-center gap-1.5`}
                >
                  <FiHeart className={filters.favorites ? "fill-current" : ""} />
                  Favourites{favorites.length > 0 ? ` (${favorites.length})` : ""}
                </button>
                <button
                  type="button"
                  onClick={openSurprise}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#C5A059] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#2C2523] transition-colors hover:bg-[#E8D3A2]"
                >
                  <FiShuffle /> Surprise me
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  aria-label={soundOn ? "Turn page-flip sound off" : "Turn page-flip sound on"}
                  className="shrink-0 rounded-full border border-[#FAF4E5]/25 p-2 text-sm text-[#FAF4E5]/80 transition-colors hover:border-[#C5A059]"
                >
                  {soundOn ? <FiVolume2 /> : <FiVolumeX />}
                </button>
              </div>

              {categoryTargets.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {categoryTargets.map((entry) => (
                    <button
                      key={entry.name}
                      type="button"
                      onClick={() => jumpToCategory(entry.page)}
                      className={chipClass(activeCategory === entry.name)}
                    >
                      {entry.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <section className="relative min-h-[calc(100vh-24vh)] w-full py-5 px-3 sm:min-h-[calc(100vh-30vh)] sm:py-10 sm:px-4 flex flex-col items-center justify-center overflow-hidden">
          <div className="my-auto flex w-full justify-center">
            {menuStatus === "loading" && (
              <div role="status" aria-live="polite" className="flex w-full flex-col items-center gap-6">
                <div
                  className={`grid ${
                    isMobile ? "h-[460px] w-full max-w-[430px] grid-cols-1" : "h-[540px] w-full max-w-[880px] grid-cols-2"
                  } gap-4 sm:gap-6 bg-transparent p-2`}
                >
                  <Skeleton className="h-full w-full bg-[#F2EBD9]/20" />
                  {!isMobile && <Skeleton className="h-full w-full bg-[#F2EBD9]/20" />}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#FAF4E5]/80">
                  <GlassLoader size={34} className="!text-[#FAF4E5]" />
                  <span>
                    {slowLoad
                      ? "Waking up the kitchen servers - this can take a few seconds on the first visit..."
                      : "Pouring our menu..."}
                  </span>
                </div>
              </div>
            )}

            {menuStatus === "error" && (
              <div className="w-full max-w-xl rounded-xl bg-paper-2 p-6 sm:p-8 text-center text-ink shadow-2xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep">
                  !
                </div>
                <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold">Menu unavailable</h2>
                <p className="mt-2 font-['Montserrat'] text-sm text-ink/70">
                  We couldn't load the menu right now. Please check your internet connection and try again.
                </p>
                <div className="mt-5">
                  <RetryBanner message="Couldn't load menu." onRetry={refetchMenu} />
                </div>
              </div>
            )}

            {isEmpty && (
              <div className="w-full max-w-xl rounded-md bg-paper-2 p-8 text-ink">
                <EmptyState title="No items available" message="Please check back later." />
              </div>
            )}

            {noMatches && (
              <div className="w-full max-w-xl rounded-md bg-paper-2 p-8 text-center text-ink">
                <EmptyState
                  title="No dishes match those filters"
                  message="Loosen a filter or two and the kitchen will find something for you."
                />
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-sm bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#2C2523] hover:bg-gold-deep hover:text-white"
                >
                  Clear filters
                </button>
              </div>
            )}

            {menuStatus === "success" && hasPages && (
              <div
                className={`w-full flex justify-center items-center ${
                  isMobile ? "min-h-0" : "min-h-[540px] sm:min-h-[580px]"
                } overflow-visible`}
              >
                <HTMLFlipBook
                  width={bookWidth}
                  height={bookHeight}
                  size="fixed"
                  minWidth={280}
                  maxWidth={490}
                  minHeight={430}
                  maxHeight={650}
                  maxShadowOpacity={0.7}
                  showCover={false}
                  usePortrait={isMobile}
                  startPage={0}
                  drawShadow={true}
                  mobileScrollSupport={true}
                  onFlip={handleFlip}
                  ref={bookRef}
                  className="mx-auto flex gap-6"
                >
                  {bookPages}
                </HTMLFlipBook>
              </div>
            )}
          </div>

          {menuStatus === "success" && hasPages && (
            <div className="mt-4 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={prevFlip}
                aria-label="Previous page"
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black shadow-lg"
              >
                <FiChevronLeft size={20} className="sm:h-6 sm:w-6" />
              </button>

              <span className="font-['Montserrat'] text-[10px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-widest text-[#FAF4E5]/80">
                {currentPage + 1} / {pages.length + 1}
              </span>

              <button
                type="button"
                onClick={nextFlip}
                aria-label="Next page"
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black shadow-lg"
              >
                <FiChevronRight size={20} className="sm:h-6 sm:w-6" />
              </button>
            </div>
          )}
        </section>
      </div>

      {detailItem && (
        <DishModal
          item={detailItem}
          isFavorite={favorites.includes(itemId(detailItem))}
          onToggleFavorite={() => toggleFavorite(itemId(detailItem))}
          onAdd={() => {
            const target = detailItem;
            setDetailItem(null);
            handleAddToCart(target);
          }}
          onClose={() => setDetailItem(null)}
        />
      )}

      {surpriseOpen && (
        <SurpriseModal
          items={surprisePool}
          onClose={() => setSurpriseOpen(false)}
          onAdd={(item) => {
            setSurpriseOpen(false);
            handleAddToCart(item);
          }}
        />
      )}

      {activeItem && (
        <CustomizationModal
          item={activeItem}
          customizations={customizations}
          loading={loadingCustomizations}
          onClose={() => {
            setActiveItem(null);
            setCustomizations([]);
          }}
        />
      )}
    </main>
  );
};

export default Menu;
