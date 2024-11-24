import { Tabs, TabsProps } from "antd";
import { FC, memo } from "react";
import MainSettings from "../components/settings/MainSettings";
import SocialMedia from "../components/settings/SocialMedia";
import SiteTags from "../components/settings/SiteTags";
import BreadCrumb from "../components/global/BreadCrumb";

/**
 * ==> props interface
 */
interface IProps {

}

const items:TabsProps['items'] =[
      {
        label: 'main settings',
        key: '1',
        children: <MainSettings/>,
      },
      {
        label: 'social media links',
        key: '2',
        children: <SocialMedia/>,
      },
      {
        label: 'Tags of the site',
        key: '3',
        children: <SiteTags/>,
      }
    ]


const handleChange = (key: string) => {
  console.log(key);
}

/**
 * ==> Component
 */
const Settings: FC<IProps> = ({  }) => {




  return (
    <>
          <BreadCrumb/>
      <section>
        <div className="container">
          <Tabs
              onChange={handleChange}
              defaultActiveKey="1"
              className=""
            >
              {items.map((item) => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                 
                      <div className="wrapper">
                        {item.children}
                      </div>
                  </Tabs.TabPane>
              ))}
            </Tabs>
        </div>
      </section>
    </>
  );
}

export default memo(Settings);