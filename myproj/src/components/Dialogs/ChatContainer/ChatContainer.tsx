import { Button, Col, Flex, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import s from './ChatContainer.module.css'
import { ChatDisplay } from './ChatDisplay/ChatDisplay';
import { MatchesDisplay } from './MatchesDisplay/MathesDisplay';

export const ChatContainer = () => {
    const {messageId} = useParams()
    
    return (
        <div className={s.chatContainer}>
            <Row>
                <Col span={6}>
                    <MatchesDisplay /> 
                </Col>
                <Col span={18}>
                    <ChatDisplay />
                </Col>
            </Row>
        </div>
    );
};