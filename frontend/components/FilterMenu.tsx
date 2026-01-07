export interface FilterMenuProps {
    selectedCategory: string;
    selectedSubCategory: string;
    onCategoryChange: (category: string) => void;
    onSubCategoryChange: (subCategory: string) => void;
}

const CATEGORIES = [
    { name: "ALL", subCategories: []},
    { name: "Sports", subCategories: ["Football", "Hockey", "Basketball", "Other"] },
    { name: "Music", subCategories: ["Rock", "Metal", "Jazz", "Pop", "Dance/Electronic", "Other"] },
    { name: "Arts & Theatre", subCategories: ["Comedy", "Spectacular", "Theatre", "Dance", "Other" ] },
    { name: "Miscellaneous", subCategories: ["Food & Drink"]}
]

export function FilterMenu( { selectedCategory, selectedSubCategory, onCategoryChange, onSubCategoryChange }: FilterMenuProps ) {
    return (
        <div>
            <h2 className="text-xl font-bold tracking-tight mb-6">Event Filters</h2>
            
            <label className="text-xs font-semibold uppercase text-zinc-500 mb-3">Category</label>
            
            <div className="flex flex-col gap-2">
                {CATEGORIES.map((category) => (
                    <div key={category.name} className="flex flex-col">
                        <button
                            onClick={() => onCategoryChange(category.name)}
                            className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                selectedCategory === category.name
                                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600"
                            }`}>
                            {category.name}
                        </button>
                        {selectedCategory === category.name && category.subCategories.length > 0 && (
                            <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                                {category.subCategories.map((subCategory) => (
                                    <button
                                        key={subCategory}
                                        className={`text-left py-1 text-xs transition-colors ${
                                            selectedSubCategory === subCategory
                                                ? "text-white font-bold"
                                                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                        }`}                                            
                                        onClick={() => onSubCategoryChange(subCategory)}
                                    >
                                        {subCategory}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}