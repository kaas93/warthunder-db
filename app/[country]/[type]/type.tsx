import Tree from "./tree";
import styles from "./type.module.scss";
import { Vehicle } from "./vehicle.model";

export const revalidate = 86_400;

interface TypeOptions {
    params: {
        country: string;
        type: string;
    };
}

export const Type = async ({ params: { country, type } }: TypeOptions) => {
    const vehicles = await fetchVehicles(country, type);
    return (
        <div className={styles.type}>
            <h1>
                [{country}] {type}
            </h1>
            <Tree vehicles={vehicles} />
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
