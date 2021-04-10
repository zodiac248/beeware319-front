import React from "react"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import ViewPosts from "./components/Social Module/ViewPosts";
import ViewCategories from "./components/Social Module/ViewTopics";
import ViewNotifications from "./components/Social Module/ViewNotifications";

export const baseUrl = "https://beeware319.herokuapp.com"

export const roles = {
    admin: "Admin"
}

export const dateFormat = 'YYYY-MM-DD'

export const EMPLOYEE_VIEWS = {
    posts: {
        title: "Posts",
        icon: <FaIcons.FaRegNewspaper />,
        component: <ViewPosts/>
    },
    categories: {
        title: "Topics",
        icon: <IoIcons.IoIosAlbums />,
        component: <ViewCategories />
    },
    notifications: {
        title: "Notifications",
        icon: <IoIcons.IoMdNotificationsOutline />,
        component: <ViewNotifications />
    }
}

export const MAIL_STATUS = {
    awaitingRequest: "Awaiting Request",
    notStarted: "Not Started",
    inProgress: "In Progress",
    closed: "Closed"
}

export const EVENT_BUS = {
    postUpdate: "updatePost",
    buildingAddDelete: "buildingAddDelete",
    topicAddDelete: "topicAddDelete"
}

export const requestStyles = {
    textAlign: 'left',
    margin: 'auto',
    "width" : "60%"
}

export const highlightedInfo = {
    color: "grey"
}

export const NOTIFICATION_TIMER = 2000