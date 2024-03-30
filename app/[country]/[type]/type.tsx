import TechTree from "./tech-tree";
import styles from "./type.module.scss";
import { Vehicle } from "./vehicle.model";

export const revalidate = 86_400;

interface TypeOptions {
    params: {
        country: string;
        type: Type;
    };
}

export type Type = "ground" | "air" | "naval";

export const Type = async ({ params: { country, type } }: TypeOptions) => {
    const vehicles = (
        await Promise.all(
            typeLookup[type].map(async (actualType) => await fetchVehicles(country, actualType)),
        )
    ).flat();
    return (
        <div className={styles.type}>
            <h1>
                [{country}] {type}
            </h1>
            <TechTree vehicles={vehicles} />
        </div>
    );
};

const fetchVehicles = async (country: string, type: string) => {
    const params = new URLSearchParams({ country, type });
    const vehicles = (await (
        await fetch(`https://wtvehiclesapi.sgambe.serv00.net/api/vehicles?${params.toString()}`)
    ).json()) as { identifier: string }[];

    return await Promise.all(vehicles.map((vehicle) => fetchVehicle(vehicle.identifier)));
};

const fetchVehicle = async (identifier: string) => {
    return (await (
        await fetch(`https://wtvehiclesapi.sgambe.serv00.net/api/vehicles/${identifier}`)
    ).json()) as Vehicle;
};

const typeLookup = {
    ground: ["lighttank", "mediumtank", "heavytank", "tankdestroyer", "spaa"],
    air: ["fighter", "stormovik", "bomber", "divebomber"],
    naval: [
        "torpedoboat",
        "submarinechaser",
        "minelayer",
        "transport",
        "navalferrybarge",
        "destroyer",
        "torpedogunboat",
        "ship",
    ],
};
