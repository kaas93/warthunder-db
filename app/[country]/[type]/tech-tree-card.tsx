import Image from "next/image";
import { FC } from "react";
import { Handle, Position } from "reactflow";
import styles from "./tech-tree-card.module.scss";
import { Vehicle } from "./vehicle.model";

export type TechNodeType = "root" | "node" | "leaf" | "premium";

export const TechTreeCard: FC<{ vehicle: Vehicle & { type: TechNodeType } }> = ({ vehicle }) => {
    const { type: techNodeType } = vehicle;
    return (
        <div className={`${styles["tech-node"]} ${vehicle.is_premium && styles["premium"]}`}>
            {(techNodeType === "node" || techNodeType === "leaf") && (
                <Handle type="target" position={Position.Left} isConnectable={false} />
            )}
            <div className={styles.details}>
                <span className={styles.label} title={formatIdentifier(vehicle.identifier)}>
                    {formatIdentifier(vehicle.identifier)}
                </span>
                <span className={styles["battle-rating"]}> {vehicle.arcade_br.toFixed(1)}</span>
                {vehicle.req_exp !== 0 && !vehicle.is_premium && (
                    <span className={styles.research}>{vehicle.req_exp}</span>
                )}
                {vehicle.value !== 0 && !vehicle.is_premium && (
                    <span className={styles.cost}>{vehicle.value}</span>
                )}
                {vehicle.req_exp === 0 && !vehicle.is_premium && <span>Reserve</span>}
                {vehicle.ge_cost !== 0 && (
                    <span className={styles["premium-cost"]}>{vehicle.ge_cost}</span>
                )}
            </div>
            <Image
                src={`https://${vehicle.images.techtree}`}
                alt={`Tech tree image for ${vehicle.identifier}`}
                width="64"
                height="64"
                quality={100}
            />
            {(techNodeType === "node" || techNodeType === "root") && (
                <Handle type="source" position={Position.Right} isConnectable={false} />
            )}
        </div>
    );
};

const formatIdentifier = (identifier: string) => {
    return identifier.replaceAll("_", " ");
};
