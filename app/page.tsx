import styles from "./page.module.scss";
import Link from "next/link";

const countries = [
    "britain",
    "china",
    "france",
    "germany",
    "isreal",
    "italy",
    "japan",
    "sweden",
    "usa",
    "ussr",
];

const Home = () => {
    return (
        <div className={styles.countries}>
            {countries.map((country) => (
                <Link className={styles.country} key={country} href={`/${country}`}>
                    {country}
                </Link>
            ))}
        </div>
    );
};
export default Home;
