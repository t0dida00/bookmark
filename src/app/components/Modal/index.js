import { addBMFolder } from '@/app/services/dataService';
import { updateBookmark } from '@/app/store/reducers/bookMarksSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Modal = (props) => {
    const { setModalOpen } = props;
    const [group, setGroup] = useState('');
    const [slug, setSlug] = useState('');
    const [slugEdited, setSlugEdited] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch(); // Redux dispatch hook
    useEffect(() => {
        setShowModal(true); // Trigger modal show animation when it opens
    }, []);

    const handleGroupChange = (e) => {
        const groupValue = e.target.value;
        setGroup(groupValue);
        if (!slugEdited) {
            setSlug(groupValue.toLowerCase());
        }
    };

    const handleSlugChange = (e) => {
        setSlug(e.target.value);
        setSlugEdited(true);
    };

    const handleAddFolders = async (e) => {
        if (!group || !slug) {
            setError("Both fields are required.");
            return;
        }
        setError(""); // Clear error if validation passes
        const data = await addBMFolder(user?.user.email, group, slug);
        dispatch(updateBookmark(data))
        setModalOpen(false);
    }

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99 transition-all  duration-300 ease-out ${showModal ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setModalOpen(false)}
        >
            <div
                className={`bg-white p-6 rounded-lg w-[80%] shadow-lg md:w-1/3 transition-all duration-300 transform ${showModal ? 'scale-100' : 'scale-0 opacity-0'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing modal if clicking inside it
            >
                <h2 className="text-xl font-bold mb-4">Add New Folder</h2>

                {/* Group Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="group">
                        Group
                    </label>
                    <input
                        id="group"
                        type="text"
                        value={group}
                        onChange={handleGroupChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddFolders();
                            }
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter group name"
                    />
                </div>

                {/* Slug Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                        Slug
                    </label>
                    <input
                        id="slug"
                        type="text"
                        value={slug}
                        onChange={handleSlugChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddFolders();
                            }
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Slug (auto-filled from group)"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg lg:hover:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddFolders}
                        className="bg-[#0B4A3B] transition-all text-white px-4 py-2 rounded-lg lg:hover:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
