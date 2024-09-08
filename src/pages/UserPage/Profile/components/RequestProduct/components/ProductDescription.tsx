import { Form } from 'antd';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductDescription: React.FC = () => {
  const quillRef = React.useRef<any>(null);
  // Handle image upload (for preview)
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target?.result;
          if (base64Image && quillRef.current) {
            // Insert base64 image into the editor
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, 'image', base64Image);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, {'header': '3'}, { 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'size': ['small', 'normal', 'large', 'huge'] }], // Added text size options
        ['link', 'image'], // Add image handler to toolbar
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload, // Override default image handler with custom handler
      },
    },
  };

  return (
    <>
      <h2 className="text-xl text-primaryColor font-semibold">Mô tả sản phẩm</h2>
      <Form.Item name={'description'}>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          theme="snow" // Use the "snow" theme for a Word-like editor
          className="h-40" // Adjust height with Tailwind CSS class
          />
      </Form.Item>
    </>
  );
};

export default ProductDescription;
