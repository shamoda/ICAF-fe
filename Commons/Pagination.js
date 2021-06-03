import React from 'react';
import _ from 'lodash'
const Pagination = () => {
    const { itemCount, pageSize } = this.props
    const pagesCount = itemsCount / pageSize
    _.range(1, pagesCount + 1)

    return (
        <Row>
            <Col>
                <Button>next</Button>
            </Col>
            <Col>

            </Col>
            <Col>
                <Button>Back</Button>
            </Col>
        </Row>

    );
}

export default Pagination;