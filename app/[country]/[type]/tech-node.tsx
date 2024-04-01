import { FC, memo } from "react";
import { NodeProps } from "reactflow";
import { TechNodeType, TechTreeCard } from "./tech-tree-card";
import { Vehicle } from "./vehicle.model";
import * as HoverCard from "@radix-ui/react-hover-card";
import { DetailCard } from "./detail-card";
import styles from "./tech-node.module.scss";

const TechNode: FC<NodeProps<Vehicle & { type: TechNodeType }>> = ({ data }) => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <TechTreeCard vehicle={data} />
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content side="right" sideOffset={20}>
                    <DetailCard vehicle={data} />
                    <HoverCard.Arrow className={styles["detail-card-arrow"]} />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default memo(TechNode);
