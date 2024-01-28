'use client';

import ReactFlow, {
    Controls,
    Background,
    Node,
    Edge,
    applyEdgeChanges,
    applyNodeChanges,
    OnNodesChange,
    OnEdgesChange,
    addEdge,
    Connection,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { findBoundingBox } from "../lib/utils";
import LearningPathNode from "./LearningPathNode";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { learningPath: LearningPathNode };

export default function HierarchyPreview() {

    const boundingBox = findBoundingBox(nodes);

    return (
        <div className=" h-[90vh]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                panOnScroll
                onlyRenderVisibleElements
                translateExtent={boundingBox}
                fitView
                fitViewOptions={{ minZoom: 1 }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

const nodes: Node[] = [
    {
        id: 'node-1',
        type: "learningPath",
        position: { x: 0, y: 0 },
        data: {
            label: 'JavaScript',
            introduction: 'JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.'
        },
    },
    {
        id: 'node-2',
        type: 'learningPath',
        position: { x: 0, y: 100 },
        data: {
            label: 'Asynchronous JavaScript',
            introduction: "Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result."
        },
    },
    {
        id: 'node-3',
        type: "learningPath",
        position: { x: 0, y: 200 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-5',
        type: "learningPath",
        position: { x: 0, y: 300 },
        targetPosition: Position.Left,
        data: {
            label: 'Intro to JS',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-6',
        type: "learningPath",
        position: { x: 0, y: 400 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-7',
        type: "learningPath",
        position: { x: 0, y: 500 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-8',
        type: "learningPath",
        position: { x: 0, y: 600 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-9',
        type: "learningPath",
        position: { x: 0, y: 700 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
    {
        id: 'node-10',
        type: "learningPath",
        position: { x: 0, y: 800 },
        data: {
            label: 'All about variables',
            introduction: "Variables are named containers that store data values for later use in your code.Think of them as labeled boxes where you can put different things."
        },
    },
];

const edges: Edge[] = [
    {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
    },
    {
        id: 'edge-5',
        source: 'node-5',
        target: 'node-6',
    },
    {
        id: 'edge-6',
        source: 'node-6',
        target: 'node-7',
    }
];