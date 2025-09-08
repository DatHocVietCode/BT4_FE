import ProductFilter from '../components/filter/filter'; // import component
import React, { useState, useEffect } from 'react';
import { Card, Col, Pagination, Row, Typography } from 'antd';
const { Title } = Typography;
const { Meta } = Card;
import axios from 'axios';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [filterParams, setFilterParams] = useState({});
    const pageSize = 8;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, filterParams]);

    const fetchProducts = async () => {
        try {
            // Build query string
            const params = new URLSearchParams({ page: currentPage, limit: pageSize, ...filterParams }).toString();
            const response = await axios.get(`http://localhost:8080/v1/api/products?${params}`);
            setProducts(response.data.data);
            console.log(response.data);
            setTotal(response.data.pagination.totalProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilter = (filters) => {
        setCurrentPage(1); // reset page khi filter
        // map frontend filter sang tên backend mong đợi
        setFilterParams({
            keyword: filters.keyword || "",
            category: filters.category || "",
            priceMin: filters.priceMin || 0,
            priceMax: filters.priceMax || Number.MAX_SAFE_INTEGER,
            discountMin: filters.discountMin || 0,
            viewsMin: filters.viewsMin || 0,
            sortBy: filters.sortBy || "",
            sortOrder: filters.sortOrder || "asc",
        });
    };  


    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Our Products</Title>
            <ProductFilter onFilter={handleFilter} />
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                        >
                            <Meta
                                title={product.name}
                                description={
                                    <div>
                                        <p>{product.description}</p>
                                        <p style={{ color: '#f50' }}>${product.price}</p>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};
export default Products;