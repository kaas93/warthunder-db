import Link from "next/link";
import styles from "./country.module.scss";

const types = [
    "lighttank",
    "mediumtank",
    "heavytank",
    "tankdestroyer",
    "spaa",
    "fighter",
    "stormovik",
    "bomber",
    "divebomber",
    "torpedoboat",
    "submarinechaser",
    "minelayer",
    "transport",
    "navalferrybarge",
    "destroyer",
    "torpedogunboat",
    "ship",
];

interface CountryOptions {
    params: {
        country: string;
    };
}
const Country = ({ params: { country } }: CountryOptions) => {
    return (
        <div className={styles.country}>
            <h1>{country}</h1>
            <div className={styles.types}>
                {types.map((type) => (
                    <div key={type}>
                        <Link className={styles.type} href={`/${country}/${type}`}>
                            {type}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Country;
