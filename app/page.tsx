import styles from "./page.module.scss";
import Link from "next/link";

const countries = [
    "britain",
    "china",
    "france",
    "germany",
    "israel",
    "italy",
    "japan",
    "sweden",
    "usa",
    "ussr",
];

const Home = () => {
    return (
        <div className={styles.home}>
            <div className={styles.countries}>
                {countries.map((country) => (
                    <div key={country}>
                        <Link className={styles.country} href={`/${country}`}>
                            {country}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;
