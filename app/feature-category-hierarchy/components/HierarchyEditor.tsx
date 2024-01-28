'use client';

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { HierarchyData, HierarchyTreeData } from '../lib/types'
import HierarchyRootTitle from "./HierarchyTitle";
import HierarchyTree from "./HierarchyTree";
import HierarchyTabs from "./HierarchyTabs";

const rootID = "ROOT"
const initialHierarchy: HierarchyTreeData = {
    [rootID]: {
        id: rootID,
        title: "",
        childIDs: [],
        parentIDs: [],
    }
};

export default function HierarchyEditor() {
    const [hierarchies, setHierarchies] = useState<HierarchyTreeData>(initialHierarchy);

    const handleChildCategoryInsert = (parentID: string) => {
        const newCategory: HierarchyData = {
            id: uuidv4(),
            title: "",
            childIDs: [],
            parentIDs: [parentID],
        }
        setHierarchies((prevHierarchies) => {
            // Updat the childIDs of the parent category
            const updatedParentCategory = {
                ...prevHierarchies[parentID],
                childIDs: [...prevHierarchies[parentID].childIDs, newCategory.id],
            }
            return {
                ...prevHierarchies,
                [parentID]: updatedParentCategory,
                [newCategory.id]: newCategory,
            }
        })
    };

    const handleSiblingCategoryInsert = (siblingID: string) => {
        const newCategory: HierarchyData = {
            id: uuidv4(),
            title: "",
            childIDs: [],
            parentIDs: [],
        };

        setHierarchies((prevHierarchies) => {
            const sibling = prevHierarchies[siblingID];
            const parentID = sibling.parentIDs[0]; // A hierarchy has always one parent
            // Sibling index in the parent's childIDs
            const siblingIndex = prevHierarchies[parentID].childIDs.indexOf(siblingID);

            // Update the sibling's parent's childIDs by inserting 
            // the new sibling's id before the current sibling's id
            const updatedParentCategory = {
                ...prevHierarchies[parentID],
                childIDs: [
                    ...prevHierarchies[parentID].childIDs.slice(0, siblingIndex),
                    newCategory.id, // Add before the sibling
                    ...prevHierarchies[parentID].childIDs.slice(siblingIndex),
                ],
            };
            // Update the new sibling's parentIDs
            const updatedNewCategory = {
                ...newCategory,
                parentIDs: [parentID],
            };

            return {
                ...prevHierarchies,
                [newCategory.id]: updatedNewCategory,
                [parentID]: updatedParentCategory,
            };
        })

    }

    const handleCategoryTitleUpdate = (categoryID: string, newTitle: string) => {
        const nextHierarchies: HierarchyTreeData = {
            ...hierarchies,
            [categoryID]: {
                ...hierarchies[categoryID],
                title: newTitle
            }
        }
        setHierarchies(nextHierarchies);
    };

    const handleCategoryDelete = (categoryID: string) => {
        setHierarchies((prevHierarchies) => {
            const categoryToDelete = prevHierarchies[categoryID];
            const parentID = categoryToDelete.parentIDs[0]; // A category must have only one parentID

            // Filter out the category to be deleted from the parent's childIDs
            const updatedParentCategory = {
                ...prevHierarchies[parentID],
                childIDs: prevHierarchies[parentID].childIDs.filter((id) => id !== categoryID),
            };

            //Create a copy of the previous hierarchies without the deleted category
            const updatedHierarchies = { ...prevHierarchies };
            delete updatedHierarchies[categoryID];

            return {
                ...updatedHierarchies,
                [parentID]: updatedParentCategory,
            }
        })
    }

    // Root represents the title of the learning path and
    // make sure not to place delete button rendering it.
    const root = hierarchies["ROOT"];
    const rootChildIDs = root?.childIDs;

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-50 via-slate-50 to-emerald-50/50 dark:bg-gradient-to-r dark:from-cyan-800/15 dark:via-slate-800/15 dark:to-emerald-900/10">
            <HierarchyTabs hierarchies={hierarchies}>
                <div className="flex item-center justify-center">
                    <HierarchyRootTitle
                        category={root}
                        onCategoryInsert={() => { handleChildCategoryInsert(root.id) }}
                        onTitleUpdate={handleCategoryTitleUpdate}
                    />
                </div>
                <ul className="md:ms-10 lg:ms-96">
                    {rootChildIDs.length > 0 && rootChildIDs.map((id: string) => (
                        <HierarchyTree
                            key={id}
                            categoryID={id}
                            hierarchies={hierarchies}
                            onChildCategoryInsert={handleChildCategoryInsert}
                            onSiblingCategoryInsert={handleSiblingCategoryInsert}
                            onTitleUpdate={handleCategoryTitleUpdate}
                            onCategoryDelete={handleCategoryDelete}
                            level={1}
                        />
                    ))}
                </ul>
            </HierarchyTabs>
        </div>
    );
}