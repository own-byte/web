import Layout from "./Layout"
import Search from "../../components/search"
import List from "../groups/List"

function DashboardLayout({ children }) {
  return (
    <Layout>
      <div className="flex flex-col h-full gap-2">
        <Search />
        <div className="flex flex-1 gap-2">
          <List />
          <div className='w-5/7 items-start justify-start rounded'>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardLayout