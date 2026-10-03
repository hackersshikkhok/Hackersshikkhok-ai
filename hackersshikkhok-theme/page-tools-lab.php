<?php
/**
 * Template Name: Hackers শিক্ষক 500+ Tools Super Platform & Universal Lab
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com | YouTube: @HackersShikkhok)
 * 
 * Provides 38 Master Technology Centers, 100+ Categories, Search-First Intent Discovery,
 * Tool of the Day, Live In-Browser Processors, and JSON-LD WebApplication Schemas.
 */
declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();

$centers = \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_centers();
$all_tools = \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_all_tools();
$tool_of_the_day = \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_tool_of_the_day();
?>

<main id="primary" class="site-main hs-tools-super-platform min-h-screen bg-[#06080d] text-slate-100 pb-20">

    <!-- Schema.org WebApplication & BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Hackers শিক্ষক 500+ Tools Super Platform",
      "url": "<?php echo esc_url( home_url( '/tools/' ) ); ?>",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description": "500+ High-speed, client-side, privacy-safe technology tools, code generators, cybersecurity analyzers, and calculators.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Hackers শিক্ষক",
        "url": "https://hackersshikkhok.com"
      }
    }
    </script>

    <!-- Master Hero Section -->
    <section class="relative pt-12 pb-14 border-b border-emerald-500/20 bg-gradient-to-b from-[#090d16] to-[#06080d] px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
            
            <!-- Breadcrumbs -->
            <nav class="flex justify-center items-center gap-2 text-xs text-slate-400 mb-6 font-mono" aria-label="Breadcrumb">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-emerald-400">Home</a>
                <span class="text-slate-600">/</span>
                <span class="text-emerald-400 font-semibold">500+ Tools Super Platform</span>
            </nav>

            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hackers শিক্ষক UNIVERSAL TECHNOLOGY TOOLBOX</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-mono">
                <span class="text-white">500+ TOOLS</span> <span class="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">SUPER PLATFORM</span>
            </h1>

            <p class="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base mb-8">
                Privacy-first, ultra-fast utilities for Web Developers, Programmers, Cybersecurity Specialists, Electronics Engineers, and Content Creators.
            </p>

            <!-- Search-First Intent Input -->
            <div class="max-w-2xl mx-auto relative mb-6">
                <div class="relative">
                    <input type="text" id="hs-universal-tool-search" placeholder="🔍 What do you want to do? (e.g. compress image, ohm's law, format json, regex, qr code)..." 
                           class="w-full px-5 py-4 pl-12 rounded-2xl bg-[#0e1422] border border-slate-700/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white placeholder-slate-500 text-sm sm:text-base outline-none transition-all shadow-xl font-mono">
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>

            <!-- Tool of the Day Banner -->
            <?php if ( ! empty( $tool_of_the_day ) ) : ?>
                <div class="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-lg text-xs font-mono">
                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">🔥 Tool of the Day</span>
                    <span class="text-white font-semibold"><?php echo esc_html( $tool_of_the_day['name'] ?? '' ); ?></span>
                    <span class="text-slate-400 hidden sm:inline">— <?php echo esc_html( $tool_of_the_day['short_desc'] ?? '' ); ?></span>
                    <a href="#tool-workspace" class="text-emerald-400 hover:text-emerald-300 font-bold underline ml-1">Launch Tool →</a>
                </div>
            <?php endif; ?>

        </div>
    </section>

    <!-- Master Centers Grid (38 Centers) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-xl font-bold text-white font-mono flex items-center gap-2">
                    <span class="text-emerald-400">#</span> Browse by Technology Center (38 Domains)
                </h2>
                <p class="text-xs text-slate-400 mt-0.5">Explore specialized engineering suites, web generators, and defensive security analyzers.</p>
            </div>
            <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">500+ Tools Total</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
            <?php foreach ( $centers as $c ) : ?>
                <button type="button" data-center="<?php echo esc_attr( $c['slug'] ); ?>" 
                        class="hs-center-pill text-left p-3.5 rounded-xl bg-[#0d121f] border border-slate-800 hover:border-emerald-500/50 hover:bg-[#111827] transition-all group">
                    <div class="flex items-center justify-between mb-2">
                        <span class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 font-mono font-bold group-hover:scale-105 transition-transform" style="color: <?php echo esc_attr( $c['accent'] ); ?>;">
                            ⚡
                        </span>
                        <span class="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                            <?php echo esc_html( (string) $c['count'] ); ?>
                        </span>
                    </div>
                    <div class="text-xs font-bold text-white group-hover:text-emerald-300 line-clamp-1">
                        <?php echo esc_html( $c['name_bn'] ); ?>
                    </div>
                    <div class="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        <?php echo esc_html( $c['name'] ); ?>
                    </div>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Tool Catalog Showcase Grid -->
        <div class="mb-10">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <span class="text-emerald-400">⚡</span> Popular & Essential Tools
                </h3>
                <div class="flex gap-2">
                    <button class="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">All</button>
                    <button class="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700">Favorites</button>
                    <button class="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700">New Radar</button>
                </div>
            </div>

            <div id="hs-tools-catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <?php foreach ( $all_tools as $tool ) : ?>
                    <div class="hs-tool-card p-4 rounded-xl bg-[#0c101a] border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                         data-tool-id="<?php echo esc_attr( $tool['id'] ); ?>" data-center="<?php echo esc_attr( $tool['center'] ); ?>">
                        <div>
                            <div class="flex items-start justify-between gap-2 mb-2">
                                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                                    <?php echo esc_html( $tool['category'] ?? 'Tool' ); ?>
                                </span>
                                <span class="text-[10px] font-mono text-slate-400">v<?php echo esc_html( $tool['version'] ?? '1.0.0' ); ?></span>
                            </div>
                            <h4 class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                                <?php echo esc_html( $tool['name'] ); ?>
                            </h4>
                            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                                <?php echo esc_html( $tool['short_desc'] ); ?>
                            </p>
                        </div>
                        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                            <span class="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                ⭐ <?php echo esc_html( (string) ( $tool['rating'] ?? 4.9 ) ); ?>
                            </span>
                            <button type="button" class="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                                Launch Tool →
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

    </section>

</main>

<?php
get_footer();
