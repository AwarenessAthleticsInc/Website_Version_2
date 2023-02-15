import { useState } from "react";
import TournamenListItem from "./TournamentListItem";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box } from "@mui/material";


const TournamentList = (props) => {
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const loadMore = () => {
        setCount((prev) => {
            const left = Number(props.tournaments.length - prev);
            if (left < 2) {
                return Number(prev + left);
            }
            if (left === 0) {
                setHasMore(false);
                return;
            }
            return Number(prev + 2);
        });
    }
    return <Box sx={{ width: '100%' }}>
        <InfiniteScroll
            dataLength={props.tournaments.slice(0, count).length}
            next={loadMore}
            hasMore={hasMore}
            refreshFunction={window.location.reload}
            pullDownToRefresh
            pullDownToRefreshThreshold={50} >
            {props.tournaments.slice(0, count).map((event) => {
                if (event.tournamentType.trim().includes('TOC')) {
                    return;
                }
                return <TournamenListItem
                    key={event._id}
                    tournament={event}
                    user={props.user}
                    setUser={props.setUser}
                    registrations={props.registrations}
                />
            })
            }
        </InfiniteScroll>
    </Box>



}
export default TournamentList;