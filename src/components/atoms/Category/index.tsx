import React from "react";

export interface CategoryProperties {
    title: string;
    content: React.ReactNode;
}
 
const Category: React.FC<CategoryProperties> = ({ title, content }) => {

    return (
        <div className="category">
            <div className="category-header">{title}</div>
            <div className="category-content">
                {content}
            </div>
        </div>
    );
};
export default React.memo(Category);
