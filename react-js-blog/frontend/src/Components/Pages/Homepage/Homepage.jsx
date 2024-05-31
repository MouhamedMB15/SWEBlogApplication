

//Imports
import React, { useEffect, useState } from 'react'
import Heading from '../../Heading/Heading';
import Navbar from '../../Navbar/Navbar';
import BlogGrid from '../../Bloggrid/Bloggrid';
import Footer from '../../Footer/Footer';
import Subheading from '../../Subheading/Subheading';
import CategoryList from '../../Categorylist/CategoryList';
//Animation
import Loading from '../../Loading/Loading';
import SuccessToast from '../../SuccessToast/SuccessToast';
import ErrorToast from '../../ErrorToast/ErrorToast';


//API Data
import BlogService from '../../../Services/BlogService';
import categoriesService from '../../../Services/CategoriesService';



// Week 1: Import the blogPosts and categories from the dummy-data.json file
/** 
import data from '../../../dummy-data.json';
import Categories from '../../Categories/Categories';
const blogs = data.blogPosts.reverse();
const categories = data.categories;
**/

//Home Page
export default function HomePage() {

 
  //New State

  //Blogs & Cateogires
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  //Modals
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");


  //v
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRes = await BlogService.fetchBlogs();
        const categoryRes = await categoriesService.fetchCategories();
        setBlogs(blogsRes.data);
        setCategories(categoryRes.data);
        
        setIsLoading(false);
        setIsSuccess(true);
        setMessage("Data fetched successfully!");
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  //Reset Sucess
  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  }

  //Reset Error
   const resetError = () => {
    setIsError(false);
    setMessage("");
  }

  if (isLoading) {
    return <Loading />;
  }



  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <Subheading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
        <Subheading subHeading={"Categories"} />
        <CategoryList categories={categories}></CategoryList>
        <Footer />
      </div>

      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccess}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetError}
      />
    </>
  );
}
