import { Route, Routes, useLocation } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Layouts from "./layouts/Layouts";
import Test from "./pages/Test";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import RequireBack from "./helpers/RequireBack";
import Faqs from "./pages/faqs/Faqs";
import AddFaqs from "./pages/faqs/AddFaqs";
import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/categories/AddCategory";
import UpdateCateogry from "./pages/categories/UpdateCateogry";
import CategoryDetails from "./pages/categories/CategoryDetails";
import SubCategories from "./pages/subCategories/SubCategories";
import { useDispatch } from "react-redux";
import { fetchSettingsAsync } from "./redux/features/SettingSlice";
import FAQDetails from "./pages/faqs/FAQDetails";



function App() {
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo({top:0, left:0 , behavior:"instant"})
  },[location.key])


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettingsAsync()); 
  }, [dispatch]);

  return (
    <Routes>
      
      <Route element={<ProtectedRoutes/>} >
      
        <Route element={<Layouts/>} >
          <Route index element={<Home/>}/>
          
          {/* test page */}
          <Route path="/test" element={<Test/>}/> 

          {/* settings page */}
          <Route path="/settings" element={<Settings/>}/>

          {/* categories page  */}
          <Route path="/categories" element={<Categories/>} />
          <Route path="/categories/view/:id" element={<CategoryDetails/>} />
          <Route path="/categories/add-category" element={<AddCategory/>}/>
          <Route path="/categories/edit/:id" element={<UpdateCateogry/>}/>

          {/* sub categories page */}
          <Route path="/sub-categories" element={<SubCategories/>} />
          
          {/* faqs page */}
          <Route path="/faqs" element={<Faqs/>} />
          <Route path="faqs/add-faq" element={<AddFaqs/>}/>
          <Route path="faqs/view/:id" element={<FAQDetails/>}/>
      
        </Route>
      
      </Route>
      <Route element={<RequireBack/>} >
      <Route path="/admin/login" element={<Login/>} />
      </Route>
        {/* not found page  */}
        <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
