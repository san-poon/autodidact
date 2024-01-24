'use client';

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Hierarchy } from '../lib/types'
import HierarchyTitle from "./HierarchyTitle";
import HierarchyTree from "./HierarchyTree";

const initialID = uuidv4();
const initialHierarchy: Record<string, Hierarchy> = {
    [initialID]: {
        id: initialID,
        title: "",
        childIDs: [],
        parentIDs: [],
    }
};

export default function CategoryHierarchy() {
    const [hierarchies, setHierarchies] = useState<Record<string, Hierarchy>>(initialHierarchy);

    const handleChildCategoryInsert = (parentID: string) => {
        const newCategory: Hierarchy = {
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
        const newCategory: Hierarchy = {
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
        const nextHierarchies: Record<string, Hierarchy> = {
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
    const root = hierarchies[initialID];
    const rootChildIDs = root.childIDs;

    return (
        <div className="m-4 min-h-screen">
            <div className="flex item-center justify-center">
                <HierarchyTitle
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
        </div>
    );
}