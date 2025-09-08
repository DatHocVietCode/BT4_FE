import { Button, Col, Input, Row, Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const ProductFilter = ({ onFilter }) => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [discountMin, setDiscountMin] = useState('');
    const [viewsMin, setViewsMin] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleApply = () => {
        onFilter({
            keyword,
            category,
            priceMin: priceMin ? Number(priceMin) : undefined,
            priceMax: priceMax ? Number(priceMax) : undefined,
            discountMin: discountMin ? Number(discountMin) : undefined,
            viewsMin: viewsMin ? Number(viewsMin) : undefined,
            sortBy,
            sortOrder
        });
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <Row gutter={16}>
                <Col>
                    <Input placeholder="Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                </Col>
                <Col>
                    <Select placeholder="Category" style={{ width: 150 }} value={category} onChange={setCategory} allowClear>
                        <Option value="Electronics">Electronics</Option>
                        <Option value="Accessories">Accessories</Option>
                        <Option value="Wearables">Wearables</Option>
                        <Option value="Stationery">Stationery</Option>
                        <Option value="Fashion">Fashion</Option>
                        <Option value="Home">Home</Option>
                        <Option value="Sports">Sports</Option>
                        <Option value="Storage">Storage</Option>
                        <Option value="Home Appliances">Home Appliances</Option>
                    </Select>
                </Col>
                <Col>
                    <Input placeholder="Price Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
                </Col>
                <Col>
                    <Input placeholder="Price Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
                </Col>
                <Col>
                    <Input placeholder="Discount Min" value={discountMin} onChange={e => setDiscountMin(e.target.value)} />
                </Col>
                <Col>
                    <Input placeholder="Views Min" value={viewsMin} onChange={e => setViewsMin(e.target.value)} />
                </Col>
                <Col>
                    <Select placeholder="Sort By" style={{ width: 120 }} value={sortBy} onChange={setSortBy} allowClear>
                        <Option value="price">Price</Option>
                        <Option value="views">Views</Option>
                        <Option value="discount">Discount</Option>
                    </Select>
                </Col>
                <Col>
                    <Select placeholder="Order" style={{ width: 120 }} value={sortOrder} onChange={setSortOrder}>
                        <Option value="asc">Asc</Option>
                        <Option value="desc">Desc</Option>
                    </Select>
                </Col>
                <Col>
                    <Button type="primary" onClick={handleApply}>Apply</Button>
                </Col>
            </Row>
        </div>
    );
};

export default ProductFilter;
