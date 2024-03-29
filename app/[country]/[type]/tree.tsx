"use client";

import { FC, useEffect } from "react";
import { Vehicle } from "./vehicle.model";
import ReactFlow, { ConnectionLineType, Edge, useEdgesState, useNodesState } from "reactflow";
import styles from "./tree.module.scss";
import "reactflow/dist/style.css";
import { toDagreLayout } from "./dagre-layout";

const Tree: FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Vehicle & { label: string }>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const baseNodes = vehicles.map((vehicle) => {
            return {
                id: vehicle.identifier,
                position: { x: 0, y: 0 },
                type: determineType(vehicle, vehicles),
                data: { ...vehicle, label: vehicle.identifier },
                connectable: false,
                deletable: false,
            };
        });
        const baseEdges = baseNodes
            .filter(({ data: { required_vehicle } }) => !!required_vehicle)
            .map((node) => {
                const edge: Edge = {
                    id: `${node.data.required_vehicle}-${node.data.identifier}`,
                    source: node.data.required_vehicle!!,
                    target: node.data.identifier,
                    type: "smoothstep",
                    animated: true,
                };
                return edge;
            });

        const { nodes: dagreNodes, edges: dagreEdges } = toDagreLayout(baseNodes, baseEdges);
        setNodes(dagreNodes);
        setEdges(dagreEdges);
    }, [vehicles]);

    return (
        <ReactFlow
            className={styles.tree}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
        />
    );
};
export default Tree;

const determineType = (vehicle: Vehicle, vehicles: Vehicle[]) => {
    const requiresVehicle = !!vehicle.required_vehicle;
    const isRequired = vehicles.some((it) => it.required_vehicle === vehicle.identifier);
    if (requiresVehicle && isRequired) return "default";
    if (requiresVehicle) return "output";
    if (isRequired) return "input";
    return "default";
};
