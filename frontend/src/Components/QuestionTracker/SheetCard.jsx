import { FiUsers, FiCheckSquare } from "react-icons/fi";

const SheetCard = ({ title, description ,questions }) => {
    return (
        <div className="flex flex-col justify-between overflow-hidden bg-white border rounded-lg shadow-sm md:h-[180px] transition-all hover:shadow-md">

            {/* Card Content */}
            <div className="flex flex-col justify-between flex-1 p-4">
                <a href="/question-tracker/sheet/striver-sde-sheet?category=all" className="block hover:text-orange-500 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-800 truncate">{title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {description}
                    </p>
                </a>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <FiCheckSquare className="mr-1 text-gray-500" />
                            <span>{questions} questions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SheetCard;
