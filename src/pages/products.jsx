import { Card, Col, Pagination, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Meta } = Card;
const { Title } = Typography;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            // Thay đổi URL API của bạn ở đây
            const response = await axios.get(`http://localhost:8080/v1/api/products?page=${currentPage}&limit=${pageSize}`);
            setProducts(response.data.data); // <-- danh sách sản phẩm
            setTotal(response.data.pagination.totalProducts); // <-- tổng số sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Our Products</Title>
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
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
