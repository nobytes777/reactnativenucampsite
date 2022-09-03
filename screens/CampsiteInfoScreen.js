import RenderCampsite from './features/campsites/RenderCampsite';
import { FlatList, StyleSheet, View, Text, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from './features/favorites/favoritesSlice';
import { useState } from 'react';
import { Input, Rating } from 'react-native-elements';




const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const [showModal, setShowModal] = useState(false);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        console.log(newComment);
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating 
                    imageSize={10}
                    style={{ alignItems: 'flex-start',
                            paddingVertical:'5%', 
                            readonly }}>
                    {item.rating}
                </Rating>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <>
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        onShowModal={() => setShowModal(!showModal)}
                        campsite={campsite}
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
        <Modal
        animationType='slide'
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
        >
            <View style={styles.modal}>
                <Rating
                    showRating
                    minValue
                    startingValue={rating}
                    imageSize={40}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{paddingVertical: 10}}
                    type='heart'
                />
                <Input
                    placeholder='Enter Your Name'
                    type
                    leftIcon='user-o'
                    leftIconContainerStyle={{paddingRight:10}}
                    onChangeText={(author) => setAuthor(author)}
                    value={author}
                >Author</Input>
                <Input
                    placeholder='Enter Your Comments'
                    leftIcon='comment-o'
                    leftIconContainerStyle={{paddingRight:10}}
                    onChangeText={(text) => setText(text)}
                    value={text}
                >Comment</Input>
                <View style={{margin:10}}>
                    <Button 
                        title='Submit'
                        color={'#5637DD'}
                        onPress={() => {handleSubmit(); resetForm();}}
                        />
                </View>
                <View style={{margin:10}}>
                    <Button 
                        onPress={() => {setShowModal(!showModal); resetForm();}}
                        color='#808080'
                        title='Cancel'
                    />
                </View>
            </View>
        </Modal>
    </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent:'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;