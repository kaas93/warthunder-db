import React, { FC, memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Vehicle } from "./vehicle.model";
import styles from "./tech-node.module.scss";
import Image from "next/image";

export type TechNodeType = "root" | "node" | "leaf" | "premium";

const TechNode: FC<NodeProps<Vehicle & { type: TechNodeType }>> = ({ data, type }) => {
    const { type: techNodeType } = data;
    return (
        <div className={styles["tech-node"]}>
            {(techNodeType === "node" || techNodeType === "leaf") && (
                <Handle type="target" position={Position.Left} />
            )}
            <span className={styles.label}>{formatIdentifier(data.identifier)}</span>
            <Image
                src={`https://${data.images.techtree}`}
                alt={`Tech tree image for ${data.identifier}`}
                width="64"
                height="64"
                quality={100}
            />
            {(techNodeType === "node" || techNodeType === "root") && (
                <Handle type="source" position={Position.Right} />
            )}
            {data.is_premium && (
                <span
                    className={styles.premium}
                    title={`Premium: ${data.ge_cost ? `${data.ge_cost} GE` : "from gift or bundle"}`}
                >
                    🪙
                </span>
            )}
        </div>
    );
};

export default memo(TechNode);

const formatIdentifier = (identifier: string) => {
    return identifier.replaceAll("_", " ");
};
