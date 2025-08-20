import  { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [loading, setloading] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');

  const blogCategories = [
    'Technology',
    'Artificial Intelligence',
    'Business',
    'Finance',
    'Marketing',
    'Data Automation',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    setloading(true);
    if (!title.trim() || !subtitle.trim() || !description.trim()) {
      toast.error(
        'Please fill in all required fields (title, subtitle, description)'
      );
      setloading(false)
      return;
    }

    // ✅ At least one image required
    const images = [image1, image2, image3, image4].filter(Boolean);
    if (images.length === 0) {
      toast.error('At least one image is required');
      setloading(false)
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('description', description);
      formData.append('category', category);

      // ✅ Append images
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post(
        `${backendUrl}/api/blogs/create`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        toast.success('Blog post added successfully!');
      }

      setTitle('');
      setSubtitle('');
      setDescription('');
      setCategory('Technology');
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setloading(false)
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message || 'Failed to add blog post');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Share your thoughts and ideas with the world
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Image Upload Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Upload Images
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Add up to 4 images to make your blog post more engaging
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { image: image1, setImage: setImage1, id: 'image1' },
                { image: image2, setImage: setImage2, id: 'image2' },
                { image: image3, setImage: setImage3, id: 'image3' },
                { image: image4, setImage: setImage4, id: 'image4' },
              ].map(({ image, setImage, id }, index) => (
                <label key={id} htmlFor={id} className="cursor-pointer group">
                  <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 group-hover:border-blue-400 transition-colors duration-200">
                    <img
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                      src={
                        image ? URL.createObjectURL(image) : assets.upload_area
                      }
                      alt={`Upload ${index + 1}`}
                    />
                    {image && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                    )}
                  </div>
                  <input
                    type="file"
                    id={id}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Blog Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter an engaging title for your blog post..."
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
            />
          </div>

          {/* Blog Subtitle */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Subtitle
            </label>
            <input
              type="text"
              placeholder="Add a compelling subtitle (optional)..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
              required
            >
              {blogCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write your blog content here... Share your thoughts, ideas, and insights with your readers."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[200px] resize-y"
              required
            />
            <p className="text-sm text-gray-500">
              {description.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disable={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>{loading ? 'Publishing...' : 'Publish Blog Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
