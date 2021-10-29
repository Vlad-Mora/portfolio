import React from 'react';
import { Pagination } from 'semantic-ui-react';

import { ContextContainer, ContextProps } from '@context/ContextContainer';

interface IPagerProperties {
    totalPages: number;
}

const Pager: React.FC<IPagerProperties> = ({ totalPages }) => {

    const { pageNumber, setPageNumber } = React.useContext(ContextContainer) as ContextProps;

    return (
        <Pagination
            className="pager"
            defaultActivePage={pageNumber}
            totalPages={totalPages}
            boundaryRange={0}
            // Use of `ts-ignore` due to the fact that type of activePage is possibly undefined (although it can't be undefined)
            // @ts-ignore
            onPageChange={(_, {activePage}) => setPageNumber(activePage - 1)}
            firstItem={null}
            lastItem={null}
        />
    );
};

export default Pager;
