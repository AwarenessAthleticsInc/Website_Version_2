// import SummarizeIcon from '@mui/icons-material/Summarize';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import GroupsIcon from '@mui/icons-material/Groups';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RuleIcon from '@mui/icons-material/Rule';
import QuizIcon from '@mui/icons-material/Quiz';
import GroupIcon from '@mui/icons-material/Group';

const Pages = [{
    pageName: 'Overview', pages: [
        {
            title: "States",
            link: '/dashboard',
            Icon: <RemoveRedEyeIcon />
        },
        // {
        //     title: "Reports",
        //     link: '/dashboard/reports',
        //     Icon: <SummarizeIcon />
        // }
    ]
},
{
    pageName: 'Events', pages: [
        {
            title: "Registrations",
            link: '/dashboard/registrations',
            Icon: <AppRegistrationIcon />
        },
        {
            title: "Tournament of Champions",
            link: '/dashboard/toc',
            Icon: <StarBorderIcon />
        },
        {
            title: "Tournaments",
            link: '/dashboard/tournaments',
            Icon: <SportsBaseballIcon />
        },
        {
            title: "Teams",
            link: '/dashboard/teams',
            Icon: <GroupsIcon />
        }
    ]
},
{
    pageName: 'Store', pages: [
        {
            title: "Orders",
            link: '/dashboard/orders',
            Icon: <LocalGroceryStoreIcon />
        },
        {
            title: "Products",
            link: '/dashboard/products',
            Icon: <i class="fa-solid fa-shirt"></i>
        },
        {
            title: "Stock",
            link: '/dashboard/stock',
            Icon: <i class="fa-solid fa-boxes-stacked"></i>
        },
        // {
        //     title: "Categories",
        //     link: '/dashboard/categories',
        //     Icon: <InventoryIcon />
        // },
    ]
},
{
    pageName: 'Other', pages: [
        {
            title: "Site Users",
            link: '/dashboard/users',
            Icon: <AccountCircleIcon />
        },
        {
            title: "Rules and Info",
            link: '/dashboard/info',
            Icon: <RuleIcon />
        },
        {
            title: "Faq",
            link: '/dashboard/faq',
            Icon: <QuizIcon />
        },
        {
            title: "Our Staff",
            link: '/dashboard/staff',
            Icon: <GroupIcon />
        },
    ]
}
]
export default Pages;