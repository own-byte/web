import DashboardLayout from "./dashboardLayout"
import Search from "../../components/search"
import List from "../groups/List"
import DashboardFocus from "./dashboardFocus"

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full gap-2">
        <Search />
        <div className="flex flex-1 gap-2">
          <List />
          <DashboardFocus />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard