import Link from "next/link";
import styles from "./country.module.scss";
import { Type } from "./[type]/type";

const types: Type[] = ["ground", "air", "naval"];

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
