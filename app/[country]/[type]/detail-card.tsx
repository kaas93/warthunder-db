import { FC } from "react";
import { Vehicle } from "./vehicle.model";
import Image from "next/image";
import styles from "./detail-card.module.scss";

export const DetailCard: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    return (
        <div className={styles.detail}>
            <Image
                src={`https://${vehicle.images.image}`}
                alt={`Detail image for ${vehicle.identifier}`}
                width={300}
                height={200}
            />
        </div>
    );
};
