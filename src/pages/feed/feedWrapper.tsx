import React from 'react';
import { useConnectToFeedOrdersWs } from '../../utils/hooks/useConnectToFeedOrdersWs';
import { Outlet } from 'react-router-dom';

type FeedWrapperProps = {
};

export const FeedWrapper: React.FC = (props: FeedWrapperProps) => {
    useConnectToFeedOrdersWs()

    return (
        <div>
            <Outlet />
        </div>
    );
};