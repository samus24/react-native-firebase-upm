import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	RefreshControl,
	FlatList,
	SafeAreaView,
	ScrollView,
	View,
} from 'react-native';
import styles from './styles';
import SkeletonContent from 'react-native-skeleton-content';
import { dwCardLayout } from '../../utils/skeletonLayouts.js';
import CardSimple from "../../components/card-simple";
import { firebase } from '../../firebase/config'
import TopBar from '../../components/TopBar';
import ModalDetail from "../../components/modal-detail";
import { Divider, Surface, Title, Subheading, } from 'react-native-paper';
import { Icon } from 'react-native-elements'

export default function HomeScreen(props) {
	const [lastNote, setLastNote] = useState(null);
	const [currentNotes, setCurrentNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingRefresh, setLoadingRefresh] = useState(false);
	const [loadingMoreNotes, setLoadingMoreNotes] = useState(true);
	const [allNotesLoaded, setAllNotesLoaded] = useState(false);

	const [dialogVisible, setDialogVisible] = useState(false);
	const [noteDetail, setNoteDetail] = useState(null);

	const BATCH_SIZE = 4;

	const noPartsIconColor = '#3239E5';

	const loadNotes = () => {
		try {
			setLoading(true);

			loadMoreNotes();
		}
		catch (e) {
			setLoading(false);
			Alert.alert(null, "Vaya, algo ha ido mal recuperando las notas. Vuelve a intentarlo en unos minutos.");
		}
	};

	useEffect(() => {
		if(lastNote){
			if(currentNotes.length === 0){
				loadMoreNotes();
			}
		}
		else{
			loadNotes();
		}
	}, [currentNotes.length, lastNote]);

	function openDetailModal(draw) {
		setShowDetailModal(true);
	}

	const renderNoteCard = ({item}) => {
		return (<>
			<CardSimple
				data={item}
				onPress={openDetailModal}
			/>
			<Divider style={{marginBottom: 5}}/>
		</>);
	};

	function loadMoreNotes(){
		const userReference = firebase.firestore().collection("users").doc(user.uid);

		if (allNotesLoaded) return;

		setLoadingMoreNotes(true);

		if(lastNote){
			firebase.firestore()
			.collection(`users/${userReference}/notes`)
			.where('isVisible', '==', true)
			.startAfter(lastNote)
			.limit(BATCH_SIZE)
			.onSnapshot((querySnapshot) => {
				querySnapshot.docChanges().forEach(async (change) => {
					if (change.type === 'added') {
						const noteData = change.doc.data();
						const newNote = {
							title: noteData["title"],
							text: noteData["text"],
						};
						setCurrentNotes((previousState) => {
							return [...previousState, newNote];
						});
						setLoading(false);
					}
				});
				if (querySnapshot.docs.length > 0) {
					const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
					setLastNote(lastVisible);
				}
				else {
					setAllNotesLoaded(true);
				}
				setLoadingMoreNotes(false);
				setLoading(false);
			});
		} else {
			setCurrentNotes([]);

			firebase.firestore()
			.collection(`users/${userReference}/notes`)
			.where('isVisible', '==', true)
			.limit(BATCH_SIZE)
			.onSnapshot((querySnapshot) => {
				querySnapshot.docChanges().forEach(async (change) => {
					if (change.type === 'added') {
						const noteData = change.doc.data();
						const newNote = {
							title: noteData["title"],
							text: noteData["text"],
						};

						setCurrentNotes((previousState) => {
							return [...previousState, newNote];
						});
						setLoading(false);
					}
				});
				if (querySnapshot.docs.length > 0) {
					const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
					setLastNote(lastVisible);
				}
				else {
					setAllNotesLoaded(true);
				}
				setLoadingMoreNotes(false);
				setLoading(false);
			});
		}
	}

	return (
		<>
			<SafeAreaView style={styles.safeContainerTop} />
			<SafeAreaView style={styles.safeContainerBottom}>
				<View style={styles.container} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
					<TopBar title="Notas" hasIcon={false} expandAction={props.navigation.toggleDrawer}></TopBar>
					{noteDetail && 
						<ModalDetail
							project={noteDetail}
							onPress={closePaymentModal}
							onClose={closePaymentModal}
							onDonate={buyParticipation}
							visible={dialogVisible}
						/>
					}
					{loading ?
						<ScrollView style={styles.container} refreshControl={
							<RefreshControl
								refreshing={loadingRefresh}
								onRefresh={loadNotes}
							/>
						}>
							{[1,2,3].map((e) =>
								<View key={`skeleton${e}`} style={{paddingTop: 10, paddingRight: 5, paddingLeft: 5}}>
									<SkeletonContent
										containerStyle={styles.skeletonContainer}
										isLoading={loading}
										animationType="pulse"
										layout={dwCardLayout}
										>
									</SkeletonContent>
								</View>
							)}
						</ScrollView>
						:
						<>
							{currentNotes.length ? 
								<>
									<FlatList													
										data={currentNotes}
										renderItem={renderNoteCard}
										keyExtractor={item => item.drawId}
										onEndReached={({ distanceFromEnd }) => {
											if (distanceFromEnd < 0) return;
											loadMoreNotes()
										}}
										onEndReachedThreshold={0.1}
										initialNumToRender={2}
										refreshing={loadingMoreNotes}
										onRefresh={() => {loadMoreNotes()}}
										getItemLayout={(data, index) => (
											{length:390, offset: 390 * index, index}
										)}
									/>
									{loadingMoreNotes &&
										<ActivityIndicator size="large" color="#3239E5"/>
									}
								</>						
								:
								<ScrollView style={styles.container} refreshControl={
									<RefreshControl
										refreshing={loadingRefresh}
										onRefresh={loadNotes}
									/>}
								>
									<Surface style={styles.surface}>
										<Icon
											name='error-outline'
											type='material'
											color={noPartsIconColor}
											size={noPartsIconSize}
										/>
										<Title style={styles.noPartsTitle}>Parece que ahora mismo no tienes ninguna nota.</Title>
										<Subheading style={styles.noPartsSubtitle}>¡Prueba a crear una!</Subheading>
									</Surface>
								</ScrollView>
							}
						</>
					}
				</View>
			</SafeAreaView>
		</>
	)
}
