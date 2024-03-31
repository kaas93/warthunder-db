"use client";

import { FC, useEffect } from "react";
import ReactFlow, { Controls, Edge, NodeTypes, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { toDagreLayout } from "./dagre-layout";
import TechNode from "./tech-node";
import { TechNodeType } from "./tech-tree-card";
import styles from "./tech-tree.module.scss";
import { Vehicle } from "./vehicle.model";

const nodeTypes: NodeTypes = {
    techNode: TechNode,
};

const TechTree: FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Vehicle & { label: string }>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const baseNodes = vehicles
            .toSorted((a, b) => a.arcade_br - b.arcade_br)
            .toSorted((a, b) => (a.is_premium ? 1 : 0) - (b.is_premium ? 1 : 0))
            .map((vehicle) => {
                return {
                    id: vehicle.identifier,
                    position: { x: 0, y: 0 },
                    type: "techNode",
                    data: { ...vehicle, type: determineType(vehicle, vehicles) },
                    draggable: false,
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
            snapToGrid={true}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
        >
            <Controls showInteractive={false} />
        </ReactFlow>
    );
};

export default TechTree;

const determineType = (vehicle: Vehicle, vehicles: Vehicle[]): TechNodeType => {
    const requiresVehicle = !!vehicle.required_vehicle;
    const isRequired = vehicles.some((it) => it.required_vehicle === vehicle.identifier);
    if (requiresVehicle && isRequired) return "node";
    if (requiresVehicle) return "leaf";
    if (isRequired) return "root";
    return "premium";
};
