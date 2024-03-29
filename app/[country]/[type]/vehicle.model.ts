export interface Vehicle {
    identifier: string;
    country: string;
    vehicle_type: string;
    event?: any;
    release_date?: any;
    version: string;
    era: number;
    arcade_br: number;
    realistic_br: number;
    simulator_br: number;
    value: number;
    req_exp: number;
    is_premium: boolean;
    is_gift: boolean;
    ge_cost: number;
    crew_total_count: number;
    mass: number;
    train1_cost: number;
    train2_cost: number;
    train3_cost_gold: number;
    train3_cost_exp: number;
    repair_time_arcade: number;
    repair_time_realistic: number;
    repair_time_simulator: number;
    repair_time_no_crew_arcade: number;
    repair_time_no_crew_realistic: number;
    repair_time_no_crew_simulator: number;
    repair_cost_arcade: number;
    repair_cost_realistic: number;
    repair_cost_simulator: number;
    repair_cost_per_min_arcade: number;
    repair_cost_per_min_realistic: number;
    repair_cost_per_min_simulator: number;
    repair_cost_full_upgraded_arcade: number;
    repair_cost_full_upgraded_realistic: number;
    repair_cost_full_upgraded_simulator: number;
    required_vehicle?: string;
    engine: Engine;
    modifications: Modification[];
    aerodynamics: Aerodynamics;
    has_customizable_weapons: boolean;
    weapons: Weapon[];
    presets: Preset[];
    customizable_presets: any[];
    versions: string[];
    images: Images;
}

interface Images {
    image: string;
    techtree: string;
}

interface Preset {
    name: string;
    weapons: Weapon[];
}

interface Weapon {
    name: string;
    weapon_type: string;
    count: number;
    ammos: Ammo[];
}

interface Ammo {
    name?: any;
    type: string;
    caliber: number;
    mass: number;
    speed?: number;
    max_distance?: number;
    explosive_type?: string;
    explosive_mass?: number;
}

interface Aerodynamics {
    length: number;
    wingspan: number;
    wing_area: number;
    empty_weight: number;
    max_takeoff_weight: number;
    max_altitude: number;
    turn_time: number;
    runway_length_required: number;
    max_speed_at_altitude: number;
}

interface Modification {
    name: string;
    tier: number;
    repair_coeff: number;
    value: number;
    req_exp: number;
    ge_cost: number;
    required_modification?: string;
}

interface Engine {
    horse_power: number;
    max_rpm: number;
    min_rpm: number;
    max_speed: number;
    max_reverse_speed: number;
}