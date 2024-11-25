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
import UpdateFaq from "./pages/faqs/UpdateFaq";
import { AppDispatch } from "./redux/store";
import Profile from "./pages/account/Profile";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import Admins from "./pages/admins/Admins";
import AddAdmin from "./pages/admins/AddAdmin";
import AddSubCategories from "./pages/subCategories/AddSubCategories";
import SubCategoryDetails from "./pages/subCategories/SubCategoryDetails";
import Banners from "./pages/banners/Banners";
import AddBanner from "./pages/banners/AddBanner";
import BannerDetails from "./pages/banners/BannerDetails";
import UpdateBanner from "./pages/banners/UpdateBanner";



function App() {
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo({top:0, left:0 , behavior:"instant"})
  },[location.key])


  const dispatch : AppDispatch = useDispatch();

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

          {/* profile page */}
          <Route path="/profile" element={<Profile/>}/>

          {/* settings page */}
          <Route path="/settings" element={<Settings/>}/>

          {/* banners page  */}
          <Route path="/banners" element={<Banners/>} />
          <Route path="/banners/:id" element={<BannerDetails/>} />
          <Route path="/banners/add-banner" element={<AddBanner/>}/>
          <Route path="/banners/:id/update" element={<UpdateBanner/>}/>

          {/* users page  */}
          <Route path="/users" element={<Users/>} />
          <Route path="/users/:id" element={<CategoryDetails/>} />
          <Route path="/users/add-user" element={<AddUser/>}/>
          <Route path="/users/:id/update" element={<UpdateCateogry/>}/>

          {/* admins page  */}
          <Route path="/admins" element={<Admins/>} />
          <Route path="/admins/:id" element={<CategoryDetails/>} />
          <Route path="/admins/add-admin" element={<AddAdmin/>}/>
          <Route path="/admins/:id/update" element={<UpdateCateogry/>}/>

          {/* categories page  */}
          <Route path="/categories" element={<Categories/>} />
          <Route path="/categories/:id" element={<CategoryDetails/>} />
          <Route path="/categories/:id/update" element={<UpdateCateogry/>}/>
          <Route path="/categories/add-category" element={<AddCategory/>}/>

          {/* sub categories page */}
          <Route path="/categories/:id/sub-categories" element={<SubCategories/>} />
          <Route path="/categories/:id/sub-categories/:id" element={<SubCategoryDetails/>} />
          <Route path="/categories/add-sub-category" element={<AddSubCategories/>} />
          <Route path="/categories/:id/sub-categories/:id/update" element={<p>update sub</p>} />


          {/* faqs page */}
          <Route path="/faqs" element={<Faqs/>} />
          <Route path="faqs/add-faq" element={<AddFaqs/>}/>
          <Route path="faqs/:id" element={<FAQDetails/>}/>
          <Route path="faqs/:id/update" element={<UpdateFaq/>}/>
      
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
