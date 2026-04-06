// =============================================================================
// USER ROLES
// =============================================================================

export const USER_ROLE_TYPES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
  COURIER: "courier",
  SUPPORT: "support",
  DEVELOPER: "developer",
};

export const USER_ROLE_TYPES_LIST = Object.values(USER_ROLE_TYPES);

export const STAFF_ROLE_TYPES = {
  MODERATOR: USER_ROLE_TYPES.MODERATOR,
  COURIER: USER_ROLE_TYPES.COURIER,
  SUPPORT: USER_ROLE_TYPES.SUPPORT,
  DEVELOPER: USER_ROLE_TYPES.DEVELOPER,
};

export const STAFF_ROLE_TYPES_LIST = Object.values(STAFF_ROLE_TYPES);

// =============================================================================
// CATEGORY TYPES (Apple Store Categories)
// =============================================================================

export const CATEGORY_TYPES = {
  ELECTRONICS: "electronics",
  AUDIO_WEARABLES: "audio_wearables",
  ACCESSORIES: "accessories",
  DESKTOPS_MONITORS: "desktops_monitors",
  TV_HOME: "tv_home",
};

export const CATEGORY_TYPES_LIST = Object.values(CATEGORY_TYPES);

// =============================================================================
// SUBCATEGORY TYPES
// =============================================================================

export const SUBCATEGORY_TYPES = {
  // Electronics
  SMARTPHONES: "smartphones",
  LAPTOPS: "laptops",
  TABLETS: "tablets",

  // Audio & Wearables
  SMART_WATCHES: "smart_watches",
  HEADPHONES: "headphones",
  SPEAKERS: "speakers",

  // Desktops & Monitors
  DESKTOPS: "desktops",
  MONITORS: "monitors",

  // Accessories
  CHARGERS: "chargers",
  CABLES: "cables",
  CASES: "cases",
  ADAPTERS: "adapters",
  KEYBOARDS: "keyboards",
  MICE: "mice",
  APPLE_PENCIL: "apple_pencil",
  HUBS_DOCKS: "hubs_docks",

  // TV & Home
  STREAMING_DEVICES: "streaming_devices",
  SMART_HOME: "smart_home",
};

export const SUBCATEGORY_TYPES_LIST = Object.values(SUBCATEGORY_TYPES);

// =============================================================================
// CATEGORY TREE (Category -> Subcategories mapping)
// =============================================================================

export const CATEGORY_TREE = {
  [CATEGORY_TYPES.ELECTRONICS]: [
    SUBCATEGORY_TYPES.SMARTPHONES,
    SUBCATEGORY_TYPES.LAPTOPS,
    SUBCATEGORY_TYPES.TABLETS,
  ],
  [CATEGORY_TYPES.AUDIO_WEARABLES]: [
    SUBCATEGORY_TYPES.SMART_WATCHES,
    SUBCATEGORY_TYPES.HEADPHONES,
    SUBCATEGORY_TYPES.SPEAKERS,
  ],
  [CATEGORY_TYPES.ACCESSORIES]: [
    SUBCATEGORY_TYPES.CHARGERS,
    SUBCATEGORY_TYPES.CABLES,
    SUBCATEGORY_TYPES.CASES,
    SUBCATEGORY_TYPES.ADAPTERS,
    SUBCATEGORY_TYPES.KEYBOARDS,
    SUBCATEGORY_TYPES.MICE,
    SUBCATEGORY_TYPES.APPLE_PENCIL,
    SUBCATEGORY_TYPES.HUBS_DOCKS,
  ],
  [CATEGORY_TYPES.DESKTOPS_MONITORS]: [SUBCATEGORY_TYPES.DESKTOPS, SUBCATEGORY_TYPES.MONITORS],
  [CATEGORY_TYPES.TV_HOME]: [SUBCATEGORY_TYPES.STREAMING_DEVICES, SUBCATEGORY_TYPES.SMART_HOME],
};

export const CATEGORY_TREE_LIST = Object.values(CATEGORY_TREE);

// =============================================================================
// ATTRIBUTE DEFINITIONS (per subcategory)
// =============================================================================

export const ATTRIBUTE_DEFINITIONS = {
  // Electronics - Smartphones
  [SUBCATEGORY_TYPES.SMARTPHONES]: [
    { key: "display", label: "Display", type: "string" },
    { key: "display_size", label: "Display Size", type: "number", unit: "inch" },
    { key: "refresh_rate", label: "Refresh Rate", type: "number", unit: "Hz" },
    { key: "processor", label: "Processor", type: "string" },
    { key: "chip_generation", label: "Chip Generation", type: "string" },
    { key: "battery", label: "Battery Capacity", type: "number", unit: "mAh" },
    { key: "storage", label: "Storage", type: "number", unit: "GB" },
    { key: "ram", label: "RAM", type: "number", unit: "GB" },
    { key: "camera_main", label: "Main Camera", type: "string" },
    { key: "camera_front", label: "Front Camera", type: "string" },
    { key: "video_recording", label: "Video Recording", type: "string" },
    { key: "sim_type", label: "SIM Type", type: "string" },
    { key: "face_id", label: "Face ID", type: "boolean" },
    { key: "wireless_charging", label: "Wireless Charging", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "g" },
    { key: "water_resistance", label: "Water Resistance", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Electronics - Laptops
  [SUBCATEGORY_TYPES.LAPTOPS]: [
    { key: "processor", label: "Processor", type: "string" },
    { key: "cpu_cores", label: "CPU Cores", type: "number" },
    { key: "gpu_cores", label: "GPU Cores", type: "number" },
    { key: "ram", label: "RAM", type: "number", unit: "GB" },
    { key: "storage_type", label: "Storage Type", type: "string" },
    { key: "storage", label: "Storage", type: "number", unit: "GB" },
    { key: "display", label: "Display Size", type: "number", unit: "inch" },
    { key: "display_resolution", label: "Display Resolution", type: "string" },
    { key: "display_technology", label: "Display Technology", type: "string" },
    { key: "graphics", label: "Graphics", type: "string" },
    { key: "battery_life", label: "Battery Life", type: "string" },
    { key: "ports", label: "Ports", type: "string" },
    { key: "camera", label: "Built-in Camera", type: "string" },
    { key: "wireless", label: "Wireless Connectivity", type: "string" },
    { key: "touch_bar", label: "Touch Bar", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "kg" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Electronics - Tablets
  [SUBCATEGORY_TYPES.TABLETS]: [
    { key: "display", label: "Display Size", type: "number", unit: "inch" },
    { key: "display_resolution", label: "Display Resolution", type: "string" },
    { key: "display_type", label: "Display Type", type: "string" },
    { key: "processor", label: "Processor", type: "string" },
    { key: "ram", label: "RAM", type: "number", unit: "GB" },
    { key: "storage", label: "Storage", type: "number", unit: "GB" },
    { key: "battery", label: "Battery Life", type: "string" },
    { key: "camera_main", label: "Main Camera", type: "string" },
    { key: "camera_front", label: "Front Camera", type: "string" },
    { key: "cellular", label: "Cellular Support", type: "boolean" },
    { key: "apple_pencil_support", label: "Apple Pencil Support", type: "boolean" },
    { key: "keyboard_support", label: "Keyboard Support", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "g" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Audio & Wearables - Smart Watches
  [SUBCATEGORY_TYPES.SMART_WATCHES]: [
    { key: "case_size", label: "Case Size", type: "number", unit: "mm" },
    { key: "display", label: "Display", type: "string" },
    { key: "processor", label: "Processor", type: "string" },
    { key: "water_resistance", label: "Water Resistance", type: "string" },
    { key: "battery_life", label: "Battery Life", type: "string" },
    { key: "gps", label: "GPS", type: "boolean" },
    { key: "cellular", label: "Cellular", type: "boolean" },
    { key: "heart_rate", label: "Heart Rate Monitor", type: "boolean" },
    { key: "ecg", label: "ECG", type: "boolean" },
    { key: "temperature_sensor", label: "Temperature Sensor", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "band_material", label: "Band Material", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Audio & Wearables - Headphones
  [SUBCATEGORY_TYPES.HEADPHONES]: [
    { key: "type", label: "Type", type: "string" },
    { key: "wireless", label: "Wireless", type: "boolean" },
    { key: "chip", label: "Audio Chip", type: "string" },
    { key: "noise_canceling", label: "Active Noise Cancellation", type: "boolean" },
    { key: "transparency_mode", label: "Transparency Mode", type: "boolean" },
    { key: "spatial_audio", label: "Spatial Audio", type: "boolean" },
    { key: "battery_life", label: "Battery Life", type: "string" },
    { key: "charging_case", label: "Charging Case", type: "boolean" },
    { key: "sweat_resistance", label: "Sweat Resistance", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "g" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Audio & Wearables - Speakers
  [SUBCATEGORY_TYPES.SPEAKERS]: [
    { key: "speaker_type", label: "Speaker Type", type: "string" },
    { key: "voice_assistant", label: "Voice Assistant", type: "string" },
    { key: "room_sensing", label: "Room Sensing", type: "boolean" },
    { key: "stereo_pair", label: "Stereo Pair Support", type: "boolean" },
    { key: "wireless", label: "Wireless", type: "boolean" },
    { key: "connectivity", label: "Connectivity", type: "string" },
    { key: "power_source", label: "Power Source", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "g" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Desktops & Monitors - Desktops
  [SUBCATEGORY_TYPES.DESKTOPS]: [
    { key: "processor", label: "Processor", type: "string" },
    { key: "cpu_cores", label: "CPU Cores", type: "number" },
    { key: "gpu_cores", label: "GPU Cores", type: "number" },
    { key: "ram", label: "RAM", type: "number", unit: "GB" },
    { key: "storage_type", label: "Storage Type", type: "string" },
    { key: "storage", label: "Storage", type: "number", unit: "GB" },
    { key: "graphics", label: "Graphics", type: "string" },
    { key: "ports", label: "Ports", type: "string" },
    { key: "bluetooth", label: "Bluetooth", type: "string" },
    { key: "wifi", label: "Wi-Fi", type: "string" },
    { key: "ethernet", label: "Ethernet", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "weight", label: "Weight", type: "number", unit: "kg" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Desktops & Monitors - Monitors
  [SUBCATEGORY_TYPES.MONITORS]: [
    { key: "display_size", label: "Display Size", type: "number", unit: "inch" },
    { key: "resolution", label: "Resolution", type: "string" },
    { key: "panel_type", label: "Panel Type", type: "string" },
    { key: "refresh_rate", label: "Refresh Rate", type: "number", unit: "Hz" },
    { key: "response_time", label: "Response Time", type: "number", unit: "ms" },
    { key: "brightness", label: "Brightness", type: "number", unit: "nits" },
    { key: "ports", label: "Ports", type: "string" },
    { key: "hdr", label: "HDR Support", type: "boolean" },
    { key: "webcam", label: "Built-in Webcam", type: "string" },
    { key: "speakers", label: "Built-in Speakers", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "height_adjustable", label: "Height Adjustable", type: "boolean" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Accessories - Chargers
  [SUBCATEGORY_TYPES.CHARGERS]: [
    { key: "power", label: "Power Output", type: "number", unit: "W" },
    { key: "ports", label: "Number of Ports", type: "number" },
    { key: "fast_charging", label: "Fast Charging", type: "boolean" },
    { key: "type", label: "Charger Type", type: "string" },
    { key: "technology", label: "Technology", type: "string" },
    { key: "cable_included", label: "Cable Included", type: "boolean" },
    { key: "compatible_devices", label: "Compatible Devices", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Accessories - Cables
  [SUBCATEGORY_TYPES.CABLES]: [
    { key: "length", label: "Length", type: "number", unit: "m" },
    { key: "connector_type", label: "Connector Type", type: "string" },
    { key: "data_transfer", label: "Data Transfer Speed", type: "string" },
    { key: "power_delivery", label: "Power Delivery", type: "string" },
    { key: "fast_charging", label: "Fast Charging Support", type: "boolean" },
    { key: "braided", label: "Braided", type: "boolean" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Accessories - Cases
  [SUBCATEGORY_TYPES.CASES]: [
    { key: "material", label: "Material", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "wireless_charging", label: "Wireless Charging Compatible", type: "boolean" },
    { key: "magsafe", label: "MagSafe Compatible", type: "boolean" },
    { key: "shock_absorbent", label: "Shock Absorbent", type: "boolean" },
    { key: "compatible_model", label: "Compatible Model", type: "string" },
    { key: "finish", label: "Finish", type: "string" },
  ],

  // Accessories - Adapters
  [SUBCATEGORY_TYPES.ADAPTERS]: [
    { key: "input_type", label: "Input Type", type: "string" },
    { key: "output_type", label: "Output Type", type: "string" },
    { key: "ports", label: "Number of Ports", type: "number" },
    { key: "power_delivery", label: "Power Delivery", type: "boolean" },
    { key: "data_transfer", label: "Data Transfer Speed", type: "string" },
    { key: "display_support", label: "Display Support", type: "string" },
  ],

  // Accessories - Keyboards
  [SUBCATEGORY_TYPES.KEYBOARDS]: [
    { key: "type", label: "Type", type: "string" },
    { key: "layout", label: "Layout", type: "string" },
    { key: "backlight", label: "Backlight", type: "boolean" },
    { key: "numeric_keypad", label: "Numeric Keypad", type: "boolean" },
    { key: "touch_bar", label: "Touch Bar", type: "boolean" },
    { key: "touch_id", label: "Touch ID", type: "boolean" },
    { key: "connection", label: "Connection Type", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "compatible_devices", label: "Compatible Devices", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Accessories - Mice
  [SUBCATEGORY_TYPES.MICE]: [
    { key: "type", label: "Type", type: "string" },
    { key: "dpi", label: "DPI", type: "number" },
    { key: "buttons", label: "Number of Buttons", type: "number" },
    { key: "scroll_wheel", label: "Scroll Wheel", type: "boolean" },
    { key: "connection", label: "Connection Type", type: "string" },
    { key: "gestures", label: "Gesture Support", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "compatible_devices", label: "Compatible Devices", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // Accessories - Apple Pencil
  [SUBCATEGORY_TYPES.APPLE_PENCIL]: [
    { key: "generation", label: "Generation", type: "string" },
    { key: "pressure_sensitivity", label: "Pressure Sensitivity", type: "boolean" },
    { key: "tilt_sensitivity", label: "Tilt Sensitivity", type: "boolean" },
    { key: "magnetic_charging", label: "Magnetic Charging", type: "boolean" },
    { key: "hover_support", label: "Hover Support", type: "boolean" },
    { key: "compatible_devices", label: "Compatible Devices", type: "string" },
  ],

  // Accessories - Hubs & Docks
  [SUBCATEGORY_TYPES.HUBS_DOCKS]: [
    { key: "ports", label: "Ports", type: "string" },
    { key: "usb_ports", label: "USB Ports", type: "number" },
    { key: "hdmi_ports", label: "HDMI Ports", type: "number" },
    { key: "display_output", label: "Display Output", type: "string" },
    { key: "sd_card_reader", label: "SD Card Reader", type: "boolean" },
    { key: "power_delivery", label: "Power Delivery", type: "number", unit: "W" },
    { key: "ethernet", label: "Ethernet Port", type: "boolean" },
    { key: "audio_jack", label: "Audio Jack", type: "boolean" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // TV & Home - Streaming Devices
  [SUBCATEGORY_TYPES.STREAMING_DEVICES]: [
    { key: "processor", label: "Processor", type: "string" },
    { key: "resolution", label: "Max Resolution", type: "string" },
    { key: "hdr", label: "HDR Formats", type: "string" },
    { key: "storage", label: "Storage", type: "number", unit: "GB" },
    { key: "connectivity", label: "Connectivity", type: "string" },
    { key: "remote", label: "Remote Included", type: "string" },
    { key: "smart_home_hub", label: "Smart Home Hub", type: "boolean" },
    { key: "gaming_support", label: "Gaming Support", type: "boolean" },
    { key: "color", label: "Color", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],

  // TV & Home - Smart Home
  [SUBCATEGORY_TYPES.SMART_HOME]: [
    { key: "device_type", label: "Device Type", type: "string" },
    { key: "voice_assistant", label: "Voice Assistant", type: "string" },
    { key: "connectivity", label: "Connectivity", type: "string" },
    { key: "matter_support", label: "Matter Support", type: "boolean" },
    { key: "thread_border_router", label: "Thread Border Router", type: "boolean" },
    { key: "power_source", label: "Power Source", type: "string" },
    { key: "sensor_package", label: "Sensors", type: "string" },
    { key: "color", label: "Color", type: "string" },
    { key: "warranty", label: "Warranty", type: "string" },
  ],
};

// =============================================================================
// CATEGORY AND SUBCATEGORY NAMES (for display)
// =============================================================================

export const CATEGORY_NAMES = {
  [CATEGORY_TYPES.ELECTRONICS]: "Electronics",
  [CATEGORY_TYPES.AUDIO_WEARABLES]: "Audio & Wearables",
  [CATEGORY_TYPES.ACCESSORIES]: "Accessories",
  [CATEGORY_TYPES.DESKTOPS_MONITORS]: "Desktops & Monitors",
  [CATEGORY_TYPES.TV_HOME]: "TV & Home",
};

export const SUBCATEGORY_NAMES = {
  // Electronics
  [SUBCATEGORY_TYPES.SMARTPHONES]: "Smartphones",
  [SUBCATEGORY_TYPES.LAPTOPS]: "Laptops",
  [SUBCATEGORY_TYPES.TABLETS]: "Tablets",

  // Audio & Wearables
  [SUBCATEGORY_TYPES.SMART_WATCHES]: "Smart Watches",
  [SUBCATEGORY_TYPES.HEADPHONES]: "Headphones",
  [SUBCATEGORY_TYPES.SPEAKERS]: "Speakers",

  // Desktops & Monitors
  [SUBCATEGORY_TYPES.DESKTOPS]: "Desktops",
  [SUBCATEGORY_TYPES.MONITORS]: "Monitors",

  // Accessories
  [SUBCATEGORY_TYPES.CHARGERS]: "Chargers",
  [SUBCATEGORY_TYPES.CABLES]: "Cables",
  [SUBCATEGORY_TYPES.CASES]: "Cases",
  [SUBCATEGORY_TYPES.ADAPTERS]: "Adapters",
  [SUBCATEGORY_TYPES.KEYBOARDS]: "Keyboards",
  [SUBCATEGORY_TYPES.MICE]: "Mice",
  [SUBCATEGORY_TYPES.APPLE_PENCIL]: "Apple Pencil",
  [SUBCATEGORY_TYPES.HUBS_DOCKS]: "Hubs & Docks",

  // TV & Home
  [SUBCATEGORY_TYPES.STREAMING_DEVICES]: "Streaming Devices",
  [SUBCATEGORY_TYPES.SMART_HOME]: "Smart Home",
};

// =============================================================================
// COMMON ATTRIBUTE VALUES (for dropdowns)
// =============================================================================

export const COMMON_ATTRIBUTE_VALUES = {
  color: [
    "Black", "White", "Silver", "Space Gray", "Midnight", "Starlight",
    "Blue", "Purple", "Pink", "Red", "Green", "Gold", "Titanium",
    "Natural Titanium", "White Titanium", "Black Titanium"
  ],
  storage: [64, 128, 256, 512, 1024, 2048],
  ram: [4, 6, 8, 12, 16, 18, 24, 32, 64, 96],
  display: ["OLED", "AMOLED", "LCD", "LED", "Mini-LED", "ProMotion XDR"],
  processor: [
    "A17 Pro", "A16 Bionic", "A15 Bionic", "M3 Pro", "M3 Max", "M2 Pro", "M2 Max",
    "M1 Pro", "M1 Max", "Intel Core i9", "Intel Core i7", "Intel Core i5",
    "AMD Ryzen 9", "AMD Ryzen 7", "AMD Ryzen 5"
  ],
  storage_type: ["SSD", "HDD", "NVMe", "SSD + HDD"],
  display_resolution: [
    "2880 x 1864", "3024 x 1964", "3456 x 2234", "2532 x 1170", "2556 x 1179",
    "4K", "5K", "6K", "Full HD", "Quad HD", "UltraWide"
  ],
  display_technology: ["Retina", "Liquid Retina XDR", "OLED", "Mini-LED"],
  graphics: [
    "Integrated", "AMD Radeon Pro", "NVIDIA GeForce RTX", "Apple GPU",
    "Intel Iris Xe", "Intel UHD"
  ],
  battery_life: ["Up to 10 hours", "Up to 12 hours", "Up to 15 hours", "Up to 18 hours", "Up to 20 hours"],
  ports: ["USB-C", "USB-A", "HDMI", "Thunderbolt 4", "Thunderbolt 3", "MagSafe", "SD Card"],
  camera: ["1080p", "720p", "12MP", "48MP"],
  wireless: ["Wi-Fi 6E", "Wi-Fi 6", "Wi-Fi 5", "Bluetooth 5.3", "Bluetooth 5.2"],
  touch_bar: ["Yes", "No"],
  sim_type: ["Nano-SIM", "eSIM", "Dual SIM"],
  display_type: ["Liquid Retina", "Liquid Retina XDR", "OLED"],
  display_size: [6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 13, 14, 15, 16],
  refresh_rate: [60, 90, 120, 144, 240],
  chip_generation: ["A17 Pro", "A16", "A15", "A14"],
  video_recording: ["4K", "1080p", "720p", "4K 60fps", "4K 30fps"],
  face_id: ["Yes", "No"],
  wireless_charging: ["Yes", "No"],
  water_resistance: ["IP68", "IP67", "IP65", "WR50", "None"],
  weight: [170, 180, 187, 200, 206, 221, 240, 250, 300, 500, 600, 700, 1000, 1200, 1500, 1800, 2000],
  case_size: [38, 40, 41, 42, 44, 45, 46, 49],
  gps: ["Yes", "No"],
  cellular: ["Yes", "No"],
  heart_rate: ["Yes", "No"],
  ecg: ["Yes", "No"],
  band_material: ["Silicone", "Leather", "Stainless Steel", "Titanium", "Nylon"],
  type: [
    "In-ear", "Over-ear", "On-ear", "Earbuds", "HomePod", "HomePod mini",
    "Wireless", "Wired", "Bluetooth"
  ],
  chip: ["H2", "H1", "W1", "U1"],
  noise_canceling: ["Yes", "No"],
  transparency_mode: ["Yes", "No"],
  spatial_audio: ["Yes", "No"],
  charging_case: ["Yes", "No"],
  sweat_resistance: ["Yes", "No", "IPX4"],
  speaker_type: ["Smart Speaker", "Portable", "Home Theater"],
  voice_assistant: ["Siri", "Alexa", "Google Assistant", "None"],
  room_sensing: ["Yes", "No"],
  stereo_pair: ["Yes", "No"],
  connectivity: ["Wi-Fi", "Bluetooth", "Wi-Fi + Bluetooth", "Ethernet"],
  power_source: ["AC Power", "Battery", "USB-C"],
  display_size_inch: [21.5, 24, 27, 32, 34, 49],
  resolution: ["1080p", "4K", "5K", "6K", "8K"],
  panel_type: ["IPS", "OLED", "VA", "TN", "Mini-LED"],
  response_time: [1, 2, 4, 5, 8, 10],
  brightness: [300, 400, 500, 600, 800, 1000, 1600],
  webcam: ["Yes", "No", "1080p", "4K"],
  speakers: ["Yes", "No", "Stereo 2W", "Stereo 5W"],
  height_adjustable: ["Yes", "No"],
  hdr: ["Yes", "No", "HDR10", "Dolby Vision"],
  power: [20, 30, 35, 45, 65, 70, 80, 85, 90, 96, 100, 140, 150, 200],
  fast_charging: ["Yes", "No"],
  charger_type: ["Wall Charger", "Car Charger", "Power Bank", "MagSafe", "Wireless"],
  technology: ["GaN", "USB-PD", "Quick Charge", "MagSafe"],
  cable_included: ["Yes", "No"],
  compatible_devices: [
    "iPhone", "iPad", "Mac", "Apple Watch", "iPhone & iPad", "All Apple Devices",
    "USB-C Devices", "USB-A Devices", "Universal"
  ],
  length: [0.5, 1, 1.2, 1.5, 2, 2.5, 3],
  connector_type: ["USB-C", "USB-A", "Lightning", "MagSafe", "USB-C to Lightning"],
  data_transfer: ["480 Mbps", "5 Gbps", "10 Gbps", "20 Gbps", "40 Gbps"],
  power_delivery: ["20W", "45W", "65W", "100W", "Yes", "No"],
  braided: ["Yes", "No"],
  material: ["Silicone", "Leather", "Plastic", "Carbon Fiber", "TPU"],
  magsafe: ["Yes", "No"],
  shock_absorbent: ["Yes", "No"],
  compatible_model: [
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 15 Plus",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 14 Plus",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
    "iPhone SE", "Universal"
  ],
  finish: ["Matte", "Glossy", "Clear", "Transparent"],
  input_type: ["USB-C", "USB-A", "HDMI", "DisplayPort", "Lightning"],
  output_type: ["USB-C", "USB-A", "HDMI", "DisplayPort", "VGA", "3.5mm"],
  display_support: ["8K", "4K", "1080p", "No"],
  layout: ["QWERTY", "RU", "US", "International"],
  backlight: ["Yes", "No"],
  numeric_keypad: ["Yes", "No"],
  connection: ["USB-C", "Bluetooth", "Wireless", "Lightning"],
  dpi: [800, 1000, 1600, 2000, 3000, 4000, 5000, 8000, 12000],
  buttons: [2, 3, 4, 5, 6],
  scroll_wheel: ["Yes", "No"],
  gestures: ["Yes", "No"],
  generation: ["1st", "2nd"],
  pressure_sensitivity: ["Yes", "No"],
  tilt_sensitivity: ["Yes", "No"],
  magnetic_charging: ["Yes", "No"],
  hover_support: ["Yes", "No"],
  hdmi_ports: [1, 2, 3, 4],
  sd_card_reader: ["Yes", "No"],
  ethernet: ["Yes", "No"],
  audio_jack: ["Yes", "No"],
  remote: ["Yes", "No", "Siri Remote", "Smart Remote"],
  smart_home_hub: ["Yes", "No"],
  gaming_support: ["Yes", "No", "Arcade"],
  device_type: [
    "Smart Speaker", "Smart Display", "Smart Plug", "Smart Switch",
    "Smart Bulb", "Camera", "Doorbell", "Thermostat", "Hub"
  ],
  matter_support: ["Yes", "No"],
  thread_border_router: ["Yes", "No"],
  sensor_package: ["Temperature", "Motion", "Humidity", "All"],
  warranty: ["1 Year", "2 Years", "Limited", "Extended"],
  cpu_cores: [4, 6, 8, 10, 12, 14, 16, 18, 20, 24],
  gpu_cores: [8, 10, 12, 14, 16, 18, 20, 24, 30, 32, 38],
  bluetooth: ["5.3", "5.2", "5.1", "5.0", "4.2"],
  wifi: ["Wi-Fi 6E", "Wi-Fi 6", "Wi-Fi 5", "Wi-Fi 4"],
};

// Get attribute values for a specific attribute key
export const getAttributeValues = (key) => {
  return COMMON_ATTRIBUTE_VALUES[key] || [];
};
