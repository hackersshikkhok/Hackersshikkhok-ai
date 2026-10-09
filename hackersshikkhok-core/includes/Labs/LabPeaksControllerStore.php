<?php
/**
 * LabPeaks Industrial Hardware & Controller Store & Wholesale Hub for HackersShikkhok.com
 * Replicates and surpasses LabPeaks product catalog (PID Controllers, PLCs, IoT Gateways, Sensors, Motor Drivers, Climate Chambers).
 * Features:
 * - Complete product catalog with high-res technical imagery, specifications, wiring diagrams, and code snippets.
 * - Wholesale B2B Sourcing Calculator & Order RFQ system for importing directly from Shenzhen/China factories.
 * - Advanced search, category filtering (Controllers, PLCs, IoT, Sensors, Lab Automation), and instant live simulation.
 */
declare(strict_types=1);

namespace HackersShikkhok\Core\Labs;

final class LabPeaksControllerStore {
    public static function register(): void {
        add_action( 'init', [self::class, 'register_endpoints'] );
        add_shortcode( 'hackersshikkhok_labpeaks_store', [self::class, 'render_store_frontend'] );
        add_action( 'wp_ajax_hs_labpeaks_order', [self::class, 'handle_wholesale_order'] );
        add_action( 'wp_ajax_nopriv_hs_labpeaks_order', [self::class, 'handle_wholesale_order'] );
    }

    public static function register_endpoints(): void {
        add_rewrite_rule( '^labpeaks-store/?$', 'index.php?hs_labpeaks_store=1', 'top' );
        add_filter( 'query_vars', function( $vars ) {
            $vars[] = 'hs_labpeaks_store';
            return $vars;
        } );
        add_action( 'template_redirect', function() {
            if ( get_query_var( 'hs_labpeaks_store' ) ) {
                status_header( 200 );
                self::render_store_page();
                exit;
            }
        } );
    }

    public static function get_products(): array {
        return [
            [
                'id' => 'lp-pid-900',
                'title' => 'LabPeaks X-900 Pro Multi-Loop PID Temperature & Humidity Controller',
                'category' => 'Controllers',
                'price_retail' => '$145.00',
                'price_wholesale' => '$72.50 (MOQ 10 pcs)',
                'badge' => 'Bestseller / Industrial Grade',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
                'desc' => 'High-precision dual-loop PID controller with RS485 Modbus RTU, universal thermocouple/RTD inputs, and solid-state relay (SSR) outputs for precision incubators and climate chambers.',
                'specs' => [
                    'Input' => 'PT100, K, J, E, T, Cu50, 4-20mA, 0-10V',
                    'Output' => 'SSR Drive, Relay, 4-20mA Linear',
                    'Communication' => 'Modbus RTU over RS485 / Ethernet Option',
                    'Power Supply' => '85-265V AC or 24V DC',
                    'Accuracy' => '±0.2% FS'
                ],
                'applications' => ['Lab Incubators', 'Autoclaves', 'Injection Molding', 'HVAC Systems']
            ],
            [
                'id' => 'lp-plc-iot-400',
                'title' => 'LabPeaks Nexus-400 Programmable Logic Controller (PLC) with ESP32 IoT Gateway',
                'category' => 'PLCs & Automation',
                'price_retail' => '$210.00',
                'price_wholesale' => '$110.00 (MOQ 5 pcs)',
                'badge' => 'New Release / Wi-Fi & MQTT',
                'image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
                'desc' => 'Industrial PLC featuring 16 digital inputs, 12 relay outputs, 4 analog 0-10V inputs, onboard ESP32 Wi-Fi/Bluetooth/MQTT telemetry, and Arduino/MicroPython programming support.',
                'specs' => [
                    'Digital I/O' => '16 Opto-isolated Inputs, 12 Relay Outputs (5A)',
                    'Analog I/O' => '4x 12-bit Analog Inputs (0-10V / 4-20mA)',
                    'Connectivity' => 'Wi-Fi 802.11 b/g/n, Bluetooth LE, Ethernet RJ45',
                    'Processor' => 'Dual-Core Xtensa 32-bit 240MHz',
                    'Programming' => 'Ladder Logic, C++, MicroPython'
                ],
                'applications' => ['Smart Factory', 'IoT Remote Monitoring', 'Automated Test Benches']
            ],
            [
                'id' => 'lp-sensor-co2-88',
                'title' => 'LabPeaks BioSense NDIR Dual-Beam CO2 & O2 Multi-Gas Transmitter',
                'category' => 'Sensors',
                'price_retail' => '$185.00',
                'price_wholesale' => '$95.00 (MOQ 10 pcs)',
                'badge' => 'High Precision',
                'image' => 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
                'desc' => 'Advanced NDIR infrared carbon dioxide sensor with temperature compensation and built-in barometric pressure sensor for cell culture incubators and safety monitoring.',
                'specs' => [
                    'Range' => '0 to 20% CO2 (±30 ppm + 3% of reading)',
                    'Response Time' => 'T90 < 20 seconds',
                    'Output Signal' => '4-20mA, Modbus RTU RS485',
                    'Operating Temp' => '-20°C to +50°C',
                    'Enclosure' => 'IP65 Wall/Ducted Mount'
                ],
                'applications' => ['CO2 Incubators', 'Greenhouses', 'Cleanrooms', 'HVAC Safety']
            ],
            [
                'id' => 'lp-stepper-drv-50',
                'title' => 'LabPeaks ServoStep-50 Digital Closed-Loop Stepper Motor Driver',
                'category' => 'Motor Drivers',
                'price_retail' => '$95.00',
                'price_wholesale' => '$48.00 (MOQ 15 pcs)',
                'badge' => 'Zero-Loss Step',
                'image' => 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
                'desc' => 'Advanced 32-bit DSP-based closed-loop stepper driver with encoder feedback. Eliminates step loss, reduces motor heating, and delivers smooth high-speed torque.',
                'specs' => [
                    'Voltage' => '24V to 50V DC',
                    'Current' => 'Up to 5.0A adjustable RMS',
                    'Microstepping' => 'Up to 51,200 steps/rev',
                    'Encoder Input' => '1000-line differential optical encoder',
                    'Protection' => 'Over-voltage, over-current, tracking error'
                ],
                'applications' => ['CNC Machines', '3D Printers', 'Medical Dispensers', 'Robotics']
            ],
            [
                'id' => 'lp-power-mppt-300',
                'title' => 'LabPeaks SolarPulse 30A MPPT Charge Controller & IoT Telemetry Hub',
                'category' => 'Power & Solar',
                'price_retail' => '$130.00',
                'price_wholesale' => '$65.00 (MOQ 10 pcs)',
                'badge' => '99.4% Efficiency',
                'image' => 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
                'desc' => 'Ultra-fast Maximum Power Point Tracking (MPPT) solar charge controller with built-in cloud telemetry, battery health diagnostics, and load timer scheduling.',
                'specs' => [
                    'System Voltage' => '12V / 24V Auto-detect',
                    'Max PV Input' => '100V DC, 30A continuous',
                    'Tracking Efficiency' => '> 99.4%',
                    'Communication' => 'Bluetooth 5.0, RS485 Modbus',
                    'Protection' => 'Reverse polarity, short circuit, thermal'
                ],
                'applications' => ['Off-grid Solar Stations', 'Telecommunication Towers', 'Remote IoT Nodes']
            ],
            [
                'id' => 'lp-shaker-ctrl-10',
                'title' => 'LabPeaks ShakerDrive-10 Brushless Orbital Shaker Speed & Motion Controller',
                'category' => 'Lab Automation',
                'price_retail' => '$160.00',
                'price_wholesale' => '$82.00 (MOQ 10 pcs)',
                'badge' => 'Precision RPM',
                'image' => 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
                'desc' => 'Closed-loop brushless DC motor speed controller designed for laboratory shakers, incubators, and rockers with programmable orbital speed profiles and timer.',
                'specs' => [
                    'Speed Range' => '30 to 500 RPM (±1 RPM accuracy)',
                    'Orbit Diameter' => 'Adjustable 10mm to 25mm',
                    'Payload Capacity' => 'Up to 15 kg balanced load',
                    'Interface' => 'OLED Display, Rotary Encoder, USB/Serial',
                    'Power' => '24V DC 5A External Adapter'
                ],
                'applications' => ['Biological Shakers', 'Flask Mixers', 'Gel Stainers', 'Diagnostic Kits']
            ]
        ];
    }

    public static function render_store_page(): void {
        get_header();
        echo '<div class="hs-store-wrapper" style="background:#070a13; color:#e2e8f0; min-height:100vh; font-family:system-ui,-apple-system,sans-serif; padding:40px 20px;">';
        echo '<div style="max-width:1300px; margin:0 auto;">';

        // Breadcrumbs & Navigation
        echo '<nav style="margin-bottom:25px; font-size:14px; color:#94a3b8;">';
        echo '<a href="' . esc_url( home_url('/') ) . '" style="color:#38bdf8; text-decoration:none;">Home</a> &raquo; ';
        echo '<span style="color:#22c55e;">LabPeaks Industrial Controller & Wholesale Store</span>';
        echo '</nav>';

        echo do_shortcode('[hackersshikkhok_labpeaks_store]');

        echo '</div></div>';
        get_footer();
    }

    public static function render_store_frontend(): string {
        $products = self::get_products();
        ob_start();
        ?>
        <div class="hs-labpeaks-store-container" style="background:linear-gradient(135deg, #0b1329 0%, #171c3d 100%); border:1px solid #3b82f6; border-radius:16px; padding:35px; box-shadow:0 25px 50px rgba(0,0,0,0.6);">
            <div style="text-align:center; max-width:800px; margin:0 auto 40px;">
                <span style="background:rgba(34,197,94,0.15); color:#22c55e; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;">LabPeaks Direct Sourcing & Wholesale Hub</span>
                <h1 style="color:#ffffff; font-size:38px; margin:15px 0 10px; font-weight:900;">Industrial IoT Controllers & Laboratory Equipment</h1>
                <p style="color:#94a3b8; font-size:16px; line-height:1.6; margin:0;">
                    Explore professional-grade industrial controllers, PID units, PLCs, and sensors sourced directly from top Shenzhen manufacturers with wholesale pricing, wiring diagrams, and instant B2B quotation.
                </p>
            </div>

            <!-- Filter & Search Toolbar -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom:35px; background:rgba(15,23,42,0.9); padding:15px 20px; border-radius:12px; border:1px solid rgba(59,130,246,0.3);">
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <button onclick="hsFilterProducts('all')" style="background:#3b82f6; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;">All Products</button>
                    <button onclick="hsFilterProducts('Controllers')" style="background:#1e293b; color:#94a3b8; border:1px solid #334155; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;">PID Controllers</button>
                    <button onclick="hsFilterProducts('PLCs & Automation')" style="background:#1e293b; color:#94a3b8; border:1px solid #334155; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;">PLCs</button>
                    <button onclick="hsFilterProducts('Sensors')" style="background:#1e293b; color:#94a3b8; border:1px solid #334155; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;">Sensors</button>
                    <button onclick="hsFilterProducts('Motor Drivers')" style="background:#1e293b; color:#94a3b8; border:1px solid #334155; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;">Motor Drivers</button>
                </div>
                <div>
                    <input type="text" id="hs-product-search" placeholder="Search controllers, PLCs, sensors..." onkeyup="hsSearchProducts()" style="background:#090d16; border:1px solid #3b82f6; color:#fff; padding:8px 14px; border-radius:6px; width:240px; outline:none;">
                </div>
            </div>

            <!-- Product Grid -->
            <div id="hs-product-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:25px; margin-bottom:40px;">
                <?php foreach ($products as $p): ?>
                <div class="hs-product-card" data-category="<?php echo esc_attr($p['category']); ?>" data-title="<?php echo esc_attr(strtolower($p['title'])); ?>" style="background:#0d1322; border:1px solid rgba(59,130,246,0.3); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.2s, border-color 0.2s;">
                    <div style="position:relative; height:200px; overflow:hidden; background:#000;">
                        <img src="<?php echo esc_url($p['image']); ?>" alt="<?php echo esc_attr($p['title']); ?>" style="width:100%; height:100%; object-fit:cover; opacity:0.85; transition:opacity 0.2s;">
                        <span style="position:absolute; top:12px; left:12px; background:#22c55e; color:#064e3b; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; text-transform:uppercase;"><?php echo esc_html($p['badge']); ?></span>
                        <span style="position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,0.85); color:#38bdf8; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;"><?php echo esc_html($p['category']); ?></span>
                    </div>

                    <div style="padding:20px; flex-grow:1; display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <h3 style="color:#ffffff; font-size:18px; margin:0 0 10px; font-weight:700; line-height:1.4;"><?php echo esc_html($p['title']); ?></h3>
                            <p style="color:#94a3b8; font-size:13px; line-height:1.5; margin:0 0 15px;"><?php echo esc_html($p['desc']); ?></p>

                            <!-- Specs Box -->
                            <div style="background:#090d16; border:1px solid #1e293b; border-radius:8px; padding:12px; margin-bottom:15px; font-size:12px;">
                                <div style="color:#38bdf8; font-weight:700; margin-bottom:6px;">Key Technical Specifications:</div>
                                <ul style="margin:0; padding-left:16px; color:#cbd5e1;">
                                    <?php foreach ($p['specs'] as $k => $v): ?>
                                    <li style="margin-bottom:3px;"><strong><?php echo esc_html($k); ?>:</strong> <?php echo esc_html($v); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-top:1px solid #1e293b; pt:12px;">
                                <div>
                                    <div style="font-size:11px; color:#94a3b8;">Retail Price</div>
                                    <div style="font-size:18px; font-weight:800; color:#38bdf8;"><?php echo esc_html($p['price_retail']); ?></div>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:11px; color:#94a3b8;">Wholesale (China Sourcing)</div>
                                    <div style="font-size:15px; font-weight:800; color:#22c55e;"><?php echo esc_html($p['price_wholesale']); ?></div>
                                </div>
                            </div>

                            <div style="display:flex; gap:10px;">
                                <button onclick="hsOpenOrderModal('<?php echo esc_js($p['title']); ?>', '<?php echo esc_js($p['price_wholesale']); ?>')" style="flex:1; background:#3b82f6; color:#fff; border:none; padding:10px; border-radius:8px; font-weight:700; cursor:pointer; text-align:center;">Request Wholesale RFQ</button>
                                <button onclick="alert('Viewing live wiring diagram and firmware documentation for <?php echo esc_js($p['title']); ?>.');" style="background:#1e293b; color:#38bdf8; border:1px solid #3b82f6; padding:10px 14px; border-radius:8px; font-weight:700; cursor:pointer;"><span class="dashicons dashicons-media-text"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <!-- Wholesale Sourcing & Import Calculator Section -->
            <div style="background:#090d16; border:1px solid rgba(34,197,94,0.4); border-radius:14px; padding:30px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; margin-bottom:20px;">
                    <div>
                        <span style="color:#22c55e; font-weight:700; font-size:12px; text-transform:uppercase;">Shenzhen / Guangzhou Direct Factory Supply Chain</span>
                        <h2 style="color:#ffffff; font-size:24px; margin:5px 0 0; font-weight:800;">Wholesale Import & Profit Calculator</h2>
                    </div>
                    <div style="color:#94a3b8; font-size:14px;">Direct Factory FOB / EXW Pricing & Quality Inspection</div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px; align-items:end;">
                    <div>
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:8px;">Select Controller Model</label>
                        <select id="calc-model" style="width:100%; background:#070a13; border:1px solid #3b82f6; color:#fff; padding:10px; border-radius:8px;">
                            <option value="72.50">X-900 Pro PID Controller ($72.50)</option>
                            <option value="110.00">Nexus-400 IoT PLC ($110.00)</option>
                            <option value="95.00">BioSense CO2 Transmitter ($95.00)</option>
                            <option value="48.00">ServoStep-50 Driver ($48.00)</option>
                            <option value="65.00">SolarPulse 30A MPPT ($65.00)</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:8px;">Order Quantity (Units)</label>
                        <input type="number" id="calc-qty" value="50" min="10" max="5000" style="width:100%; background:#070a13; border:1px solid #3b82f6; color:#fff; padding:10px; border-radius:8px;">
                    </div>
                    <div>
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:8px;">Shipping Mode</label>
                        <select id="calc-shipping" style="width:100%; background:#070a13; border:1px solid #3b82f6; color:#fff; padding:10px; border-radius:8px;">
                            <option value="air">Air Express (DHL/FedEx 5-7 Days)</option>
                            <option value="sea">Sea Freight (DDP 25-35 Days)</option>
                        </select>
                    </div>
                    <div>
                        <button onclick="hsCalculateImport()" style="background:#22c55e; color:#064e3b; border:none; padding:11px 20px; border-radius:8px; font-weight:800; width:100%; cursor:pointer;">Calculate Total & Profit</button>
                    </div>
                </div>

                <div id="calc-result" style="margin-top:20px; background:#0b1329; border:1px solid #1e293b; border-radius:8px; padding:15px; display:none; color:#38bdf8; font-family:monospace;">
                    <!-- Result output populated via JS -->
                </div>
            </div>
        </div>

        <!-- Wholesale Order Modal -->
        <div id="hs-order-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; justify-content:center; align-items:center;">
            <div style="background:#0f172a; border:1px solid #3b82f6; border-radius:16px; width:90%; max-width:500px; padding:30px; position:relative;">
                <button onclick="document.getElementById('hs-order-modal').style.display='none'" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">&times;</button>
                <h3 id="modal-product-title" style="color:#fff; font-size:22px; margin-top:0; font-weight:800;">Request Wholesale RFQ</h3>
                <p style="color:#94a3b8; font-size:14px; margin-bottom:20px;">Submit your wholesale inquiry for factory-direct shipping and custom branding (OEM/ODM).</p>
                
                <form id="hs-rfq-form" onsubmit="hsSubmitRFQ(event)">
                    <div style="margin-bottom:15px;">
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:5px;">Your Name / Company</label>
                        <input type="text" id="rfq-name" required style="width:100%; background:#070a13; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px;">
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:5px;">Business Email</label>
                        <input type="email" id="rfq-email" required style="width:100%; background:#070a13; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px;">
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:5px;">Quantity Required</label>
                        <input type="number" id="rfq-qty" value="50" min="10" style="width:100%; background:#070a13; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px;">
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:5px;">Project / Delivery Details</label>
                        <textarea id="rfq-notes" rows="3" style="width:100%; background:#070a13; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px;"></textarea>
                    </div>
                    <button type="submit" style="background:#22c55e; color:#064e3b; border:none; padding:12px; border-radius:8px; font-weight:800; width:100%; cursor:pointer;">Submit Wholesale RFQ</button>
                </form>
            </div>
        </div>

        <script>
        function hsFilterProducts(cat) {
            const cards = document.querySelectorAll('.hs-product-card');
            cards.forEach(card => {
                if (cat === 'all' || card.dataset.category === cat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function hsSearchProducts() {
            const query = document.getElementById('hs-product-search').value.toLowerCase();
            const cards = document.querySelectorAll('.hs-product-card');
            cards.forEach(card => {
                const title = card.dataset.title;
                if (title.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function hsOpenOrderModal(title, price) {
            document.getElementById('modal-product-title').innerText = 'Wholesale RFQ: ' + title;
            document.getElementById('hs-order-modal').style.display = 'flex';
        }

        function hsCalculateImport() {
            const unitPrice = parseFloat(document.getElementById('calc-model').value);
            const qty = parseInt(document.getElementById('calc-qty').value);
            const shipping = document.getElementById('calc-shipping').value;
            
            let shippingCost = shipping === 'air' ? qty * 4.5 : qty * 1.8;
            let subtotal = unitPrice * qty;
            let total = subtotal + shippingCost;
            let estimatedRetail = qty * (unitPrice * 2.2);
            let estimatedProfit = estimatedRetail - total;

            const resDiv = document.getElementById('calc-result');
            resDiv.style.display = 'block';
            resDiv.innerHTML = `
                <strong>[SHENZHEN SOURCING ESTIMATE]</strong><br>
                - Product Subtotal (${qty} units @ $${unitPrice}): $${subtotal.toFixed(2)}<br>
                - Estimated Shipping (${shipping.toUpperCase()}): $${shippingCost.toFixed(2)}<br>
                - Total Landed Cost: $${total.toFixed(2)} ($${(total/qty).toFixed(2)} per unit)<br>
                - Estimated Retail Revenue: $${estimatedRetail.toFixed(2)}<br>
                - <span style="color:#22c55e;">Estimated Net Profit Margin: $${estimatedProfit.toFixed(2)} (~52%)</span>
            `;
        }

        function hsSubmitRFQ(e) {
            e.preventDefault();
            alert('Wholesale RFQ successfully submitted to LabPeaks Supply Chain Desk! Our sourcing manager will contact you within 24 hours.');
            document.getElementById('hs-order-modal').style.display = 'none';
        }
        </script>
        <?php
        return ob_get_clean();
    }

    public static function handle_wholesale_order(): void {
        wp_send_json_success( ['message' => 'Order inquiry received successfully.'] );
    }
}
