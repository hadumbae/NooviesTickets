/**
 * @fileoverview Page component for the authenticated user's review dashboard.
 */

import {ReactElement} from 'react';
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyReviewsPageContent} from "@/views/client/users/my-reviews-page/content.tsx";
import {useSetPageTitle} from "@/shared/_feat";
import {MyReviewsLoader} from "@/views/client/movie-reviews/_feat";

const REVIEWS_PER_PAGE = 10;

/**
 * Displays the authenticated user's movie reviews with pagination support.
 */
export function MyReviewsPage(): ReactElement {
    useSetPageTitle({presetTitle: "My Reviews"});

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    return (
        <MyReviewsLoader page={page} perPage={REVIEWS_PER_PAGE}>
            {({totalItems, items}) => (
                <MyReviewsPageContent
                    page={page}
                    perPage={REVIEWS_PER_PAGE}
                    setPage={setPage}
                    reviews={items}
                    totalItems={totalItems}
                />
            )}
        </MyReviewsLoader>
    );
}