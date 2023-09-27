import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-native-modal';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FormInput = () => {
    const [userId, setUserId] = useState(null); const
        [currentPage, setCurrentPage] = useState(1);
    const [page1Id, setPage1Id] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [sessions, setSessions] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedOptionTwo, setSelectedOptionTwo] = useState('');
    const [selectedOptionThree, setSelectedOptionThree] = useState('');
    const [attendanceType, setAttendanceType] = useState('Pilih Tipe Kehadiran');
    const attendanceOptions = [
        'Hadir Online',
        'Hadir Offline',
        'Tidak Hadir (Sudah Izin)',
        'Tidak Hadir (Ghaib)',
    ];
    const [name, setName] = useState('');
    const [namaOrtu, setOrtu] = useState('');
    const [noWa, setNoWa] = useState('');
    const [alasan, setAlasan] = useState('');
    const [resume, setResume] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchSessions = async () => {
        try {
            const response = await axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/session/active');
            const activeSessions = response.data.body.details;
            setSessions(activeSessions);
        } catch (error) {
            console.error('Error fetching sessions data:', error);
        }
    };


    const fetchInstitutions = async () => {
        try {
            const response = await axios.get('https://api-nusa-sarat.nuncorp.id/api/v1/institution/filter');
            const institutionData = response.data.body;
            const institutionItems = institutionData.map((institution) => ({
                label: institution.name,
                value: institution.id.toString(),
            }));
            setInstitutions(institutionItems);
        } catch (error) {
            console.error('Error fetching institution data:', error);
        }
    };

    const fetchQuestions = async (sessionDetailId) => {
        try {
            const response = await axios.get(`https://api-nusa-sarat.nuncorp.id/api/v1/question/filter?session_detail=${sessionDetailId}`);
            const questionData = response.data.body;
            setQuestions(questionData);
        } catch (error) {
            console.error('Error fetching questions data:', error);
        }
    };


    const fetchUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
            } else {
                console.log('Data Pengguna tidak ditemukan di AsyncStorage.');
            }
        } catch (error) {
            console.error('Gagal mengambil data pengguna dari AsyncStorage:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchSessions();
        fetchInstitutions();
    }, []);

    useEffect(() => {
        console.log('Nilai selectedOption:', selectedOption);
        if (selectedOption) {
            fetchQuestions(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        const fetchUserIdFromAsyncStorage = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('user');
                if (storedUserData) {
                    const { id } = JSON.parse(storedUserData);
                    setUserId(id);
                    console.log('user_id:', id);
                }
            } catch (error) {
                console.error('Error fetching user_id from AsyncStorage:', error);
            }
        };

        fetchUserIdFromAsyncStorage();
    }, []);



    const handleOptionSelect = (questionId, optionId) => {
        const existingAnswerIndex = selectedAnswers.findIndex(answer => answer.question_id === questionId);

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...selectedAnswers];
            updatedAnswers[existingAnswerIndex] = { question_id: questionId, question_detail_id: optionId };
            setSelectedAnswers(updatedAnswers);
        } else {
            setSelectedAnswers([...selectedAnswers, { question_id: questionId, question_detail_id: optionId }]);
        }
    };

    const handleOpenStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const handleOpenEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const handleConfirmStartTime = (time) => {
        setStartTimePickerVisibility(false);
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setStartTime(formattedTime);
    };

    const handleConfirmEndTime = (time) => {
        setEndTimePickerVisibility(false);
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setEndTime(formattedTime);
    };

    const handleCancelTimePicker = () => {
        setStartTimePickerVisibility(false);
        setEndTimePickerVisibility(false);
    };

    const checkCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            console.log('Camera permission denied');
            return false;
        }
        return true;
    };

    const selectImage = async () => {
        const hasCameraPermission = await checkCameraPermission();

        if (!hasCameraPermission) {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const sendFormDataToAPIPage1 = async (formData) => {
        try {
            if (selectedImage) {
                const fileName = selectedImage.split('/').pop();
                formData.append('resume_file', {
                    uri: selectedImage,
                    name: fileName,
                });
            }
            const response = await axios.post('https://api-nusa-sarat.nuncorp.id/api/v1/session/resume/answer', formData);

            // Pemeriksaan respons dari server
            if (response.status === 200) {
                // Data berhasil terkirim ke server
                console.log('Data pada halaman 1 berhasil terkirim ke server:', response.data);

                // Tambahkan kode lain yang perlu dieksekusi setelah berhasil
            } else {
                // Gagal mengirim data
                console.error('Gagal mengirim data ke server pada halaman 1');
            }

            return response.data;
        } catch (error) {
            console.error('Error sending data to API on page 1:', error.response ? error.response.data : error.message);
            throw error;
        }
    };


    const sendFormDataToAPIPage2 = async (formData) => {
        try {
            if (!userId) {
                console.error('userId is missing.');
                return;
            }
            formData.user_id = userId;
            const response = await axios.post('https://api-nusa-sarat.nuncorp.id/api/v1/exams/answer', formData);
            return response.data;
        } catch (error) {
            console.error('Error sending data to API on page 2:', error);
            if (error.response) {
                console.error('API Error Response:', error.response.data);
            }
            throw error;
        }
    };
    const handleSendMessage = () => {
        setModalVisible(true);
    };

    const handleConfirmSendMessage = async () => {
        try {
            let responsePage1 = null;

            if (currentPage === 1) {
                const formDataPage1 = {
                    session_detail_id: selectedOption,
                    institution: selectedInstitution,
                    parent_type: selectedOptionTwo,
                    student_name: name,
                    student_class: selectedOptionThree,
                    parent_name: namaOrtu,
                    parent_phone: noWa,
                    attendance_type: attendanceType,
                    start_time: startTime,
                    end_time: endTime,
                    reason_late: alasan,
                    resume: resume,
                    resume_file: selectedImage,

                    // Tambahkan ID dari respons API
                    id: responseDataPage1.body.id, // Gantilah responseDataPage1 dengan respons aktual dari API
                };

                try {
                    responsePage1 = await sendFormDataToAPIPage1(formDataPage1);

                    if (responsePage1.id) {
                        console.log('Data pada halaman 1 berhasil dikirim dengan ID:', responsePage1.id);
                        setPage1Id(responsePage1.id);
                    } else {
                        throw new Error('Gagal mengirim jawaban pada halaman 1');
                    }
                } catch (error) {
                    console.error('Error handling confirmation on page 1:', error.message);
                    return;
                }
            }

            if (currentPage === 2) {
                if (!page1Id) {
                    console.error('ID dari Page 1 tidak tersedia.');
                    return;
                }

                const formDataPage2 = {
                    session_detail_id: page1Id, // Gunakan page1Id yang telah diperoleh
                    answers: selectedAnswers,
                };

                try {
                    const responsePage2 = await sendFormDataToAPIPage2(formDataPage2);

                    if (responsePage2.id) {
                        console.log('Data pada halaman 2 berhasil dikirim dengan ID:', responsePage2.id);
                    } else {
                        throw new Error('Gagal mengirim jawaban pada halaman 2');
                    }
                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        console.error('Kesalahan validasi pada halaman 2:', error.response.data);
                    } else if (error.response && error.response.status === 500) {
                        console.error('Terjadi kesalahan server pada halaman 2:', error.response.data);
                    } else {
                        console.error('Terjadi kesalahan saat mengirim data pada halaman 2:', error.message);
                    }
                }
            }

            // Setelah selesai mengirim data, lakukan pengaturan dan penghapusan data yang diperlukan.
            // setSelectedOption('');
            // setSelectedOptionTwo('');
            // setSelectedOptionThree('');
            // setName('');
            // setOrtu('');
            // setNoWa('');
            // setAlasan('');
            // setResume('');
            // setAttendanceType('');
            // setSelectedImage(null);
            // setStartTime(null);
            // setEndTime(null);
            // setModalVisible(false);
        } catch (mainError) {
            console.error('Terjadi kesalahan utama:', mainError.message);
        }
    };




    const handleCancelSendMessage = () => {
        setModalVisible(false);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <ScrollView style={styles.container}>
            {currentPage === 1 && (
                <>
                    <Text style={styles.title}>Resume SARAT T.A. 2022/2023</Text>
                    <Text style={styles.label}>Sesi</Text>
                    <View style={styles.radioButtonContainer}>
                        {sessions.map(session => (
                            <View key={session.id}>
                                <View
                                    onPress={() => setSelectedOption(session.id)}
                                    style={styles.radioButtonItem}
                                >
                                    <RadioButton
                                        value={session.id}
                                        status={selectedOption === session.id ? 'checked' : 'unchecked'}
                                        onPress={() => setSelectedOption(session.id)}
                                        color="#F16877"
                                        uncheckedColor="#F16877"
                                        borderColor="#F16877"
                                        borderWidth={0.5}
                                    />
                                    <Text style={styles.radioButtonLabel}>{session.title} : {session.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.label}>Asal Institusi</Text>
                    <ModalDropdown
                        options={institutions.map((institution) => institution.label)}
                        defaultValue={selectedInstitution || 'Pilih Institusi'}
                        onSelect={(index, value) => setSelectedInstitution(value)}
                        style={styles.dropdownStyle}
                        textStyle={styles.dropdownTextStyle}
                        renderRow={(option, index, isSelected) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedInstitution(option);
                                }}
                                style={[
                                    styles.dropdownRow,
                                    isSelected && styles.selectedDropdownRow
                                ]}
                            >
                                <Text style={styles.dropdownText}>{option}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <Text style={styles.label}>Posisi Rumah Tangga</Text>
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButtonItem}>
                            <RadioButton
                                value="ayah"
                                status={selectedOptionTwo === 'ayah' ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedOptionTwo('ayah')}
                                color="#F16877"
                                uncheckedColor="#F16877"
                                borderColor="#F16877"
                                borderWidth={0.5}
                            />
                            <Text style={styles.radioButtonLabel}>Ayah</Text>
                        </View>

                        <View style={styles.radioButtonItem}>
                            <RadioButton
                                value="ibu"
                                status={selectedOptionTwo === 'ibu' ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedOptionTwo('ibu')}
                                color="#F16877"
                                uncheckedColor="#F16877"
                                borderColor="#F16877"
                                borderWidth={0.5}
                            />
                            <Text style={styles.radioButtonLabel}>Bunda</Text>
                        </View>
                    </View>
                    <Text style={styles.label}>Nama Lengkap Ananda:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Nama Lengkap"
                    />
                    <Text style={styles.label}>Kelas Ananda (Diisi khusus bagi Wali Murid SAIM)</Text>
                    <TextInput
                        style={styles.input}
                        value={selectedOptionThree}
                        onChangeText={(text) => setSelectedOptionThree(text)}
                        placeholder="Kelas Ananda"
                    />
                    <Text style={styles.label}>Nama Lengkap Ayah/Bunda | Contoh: Dr. H. Abdurrahman, M.Si. (perhatikan spasi, titik koma, huruf besar dan kecilnya):</Text>
                    <TextInput
                        style={styles.input}
                        value={namaOrtu}
                        onChangeText={(text) => setOrtu(text)}
                        placeholder="Nama Lengkap Ayah/Bunda"
                        keyboardType="default"
                    />
                    <Text style={styles.label}>Nomor Whatsapp | Contoh: '+628123456789 (perhatikan formatnya dan diawali tandi petik satu)</Text>
                    <TextInput
                        style={styles.input}
                        value={noWa}
                        onChangeText={(text) => setNoWa(text)}
                        placeholder="Nomor Whatsapp"
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.label}>Tipe Kehadiran</Text>
                    <ModalDropdown
                        options={attendanceOptions}
                        defaultValue={attendanceType}
                        onSelect={(index, value) => setAttendanceType(value)}
                        style={styles.dropdownStyle}
                        textStyle={styles.dropdownTextStyle}
                        renderRow={(option, index, isSelected) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setAttendanceType(option);
                                }}
                                style={[
                                    styles.dropdownRow,
                                    isSelected && styles.selectedDropdownRow,
                                ]}
                            >
                                <Text style={styles.dropdownText}>{option}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={styles.label}>Jam Kehadiran</Text>
                    <TouchableOpacity
                        style={styles.timeButton}
                        onPress={handleOpenStartTimePicker}
                    >
                        {startTime ? (
                            <Text style={[styles.buttonText, { color: 'black' }]}>{startTime}</Text>
                        ) : (
                            <Text style={[styles.buttonText, { color: '#bbb' }]}>00:00</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={[styles.label, { color: 'black' }]}>Jam Kepulangan</Text>
                    <TouchableOpacity
                        style={styles.timeButton}
                        onPress={handleOpenEndTimePicker}
                    >
                        {endTime ? (
                            <Text style={[styles.buttonText, { color: 'black' }]}>{endTime}</Text>
                        ) : (
                            <Text style={[styles.buttonText, { color: '#bbb' }]}>00:00</Text>
                        )}
                    </TouchableOpacity>

                    {isStartTimePickerVisible && (
                        <DateTimePickerModal
                            isVisible={isStartTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmStartTime}
                            onCancel={handleCancelTimePicker}
                        />
                    )}

                    {isEndTimePickerVisible && (
                        <DateTimePickerModal
                            isVisible={isEndTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmEndTime}
                            onCancel={handleCancelTimePicker}
                        />
                    )}

                    <Text style={styles.label}>Alesan Terlambat ?</Text>
                    <TextInput
                        style={styles.input}
                        value={alasan}
                        onChangeText={(text) => setAlasan(text)}
                        placeholder="Alasan Terlambat"
                        keyboardType="default"
                    />

                    <View>
                        <Text style={styles.label}>"Silahkan Ayah/Bunda bisa memasukkan catatannya di kolom paragraf atau upload filenya. File bisa hasil ketikan, atau tulisan tangan yang dijepret dengan kamera untuk kemudian diunggah ke link. Boleh pilih yang mana saja yang memudahkan. Lebih kami sarankan dalam bentuk tulisan paragraf saja."</Text>
                    </View>

                    <Text style={{ marginBottom: 5, }} >1. Opsi Pertama, masukkan resume Ayah/Bunda disini dari hasil ketikan di laptop atau ketikan jempol di HP. Resume mengandung hal-hal baru yang didapatkan dari sesi kali ini. Dapat dituliskan poin per poin tanpa dibatasi jumlahnya.</Text>
                    <TextInput
                        style={styles.textarea}
                        value={resume}
                        onChangeText={(text) => setResume(text)}
                        placeholder="Masukkan Pesan"
                        multiline={true}
                        numberOfLines={4}
                    />

                    <Text style={{ marginBottom: 5 }}>2. Opsi kedua, masukkan resume Ayah/Bunda disini jika ingin langsung mengambil foto dari coretannya di atas kertas.</Text>
                    <TouchableOpacity
                        style={[styles.buttonStyle, styles.selectImageButtonStyle]}
                        activeOpacity={0.5}
                        onPress={selectImage}
                    >
                        <Text style={[styles.selectImageButtonTextStyle]}>Select Image</Text>
                    </TouchableOpacity>

                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.selectedImageStyle}
                            resizeMode="contain"
                        />
                    )}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNextPage}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </>
            )}
            {currentPage === 2 && (
                <>
                    <Text style={styles.title}>Pertanyaan</Text>
                    {questions.map((question, index) => (
                        <View key={question.id} style={styles.questionContainer}>
                            <Text style={styles.label}>{`Pertanyaan ${index + 1}: ${question.description}`}</Text>
                            {question.question_details.map((option, optionIndex) => (
                                <View key={option.id} style={styles.optionContainer}>
                                    <Text style={styles.optionLabel}>{`Pilihan ${optionIndex + 1}`}</Text>
                                    <CheckBox
                                        checked={selectedAnswers.some(answer => answer.question_id === question.id && answer.question_detail_id === option.id)}
                                        onPress={() => handleOptionSelect(question.id, option.id)}
                                        containerStyle={styles.checkBoxContainer}
                                    />
                                    <Text style={styles.checkBoxLabel}>{option.description}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSendMessage}>
                        <Text style={styles.submitButtonText}>Kirim Jawaban</Text>
                    </TouchableOpacity>
                </>
            )}
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Konfirmasi</Text>
                    <Text style={styles.modalMessage}>Apakah Anda yakin ingin mengirim jawaban?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#F16877' }]} onPress={handleConfirmSendMessage}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#CCCCCC' }]} onPress={handleCancelSendMessage}>
                            <Text style={styles.modalButtonText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(16),
    },
    selectImageButtonStyle: {
        backgroundColor: '#FFD700',
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    selectImageButtonTextStyle: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
    buttonTextStyle: {
        backgroundColor: 'black',
        padding: 15,
    },
    selectedImageStyle: {
        width: 300,
        height: 300,
        marginBottom: 10,
        borderRadius: 8,
    },
    selectedFileContainer: {
        marginTop: 10,
        marginBottom: verticalScale(10),
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    selectedFileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: verticalScale(16),
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: moderateScale(3),
        marginBottom: verticalScale(8),
    },
    input: {
        height: 80,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderColor: '#F16877',
        borderRadius: 8,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#F16877',
        marginBottom: 12,
        paddingHorizontal: 8,
        paddingTop: 8,
        textAlignVertical: 'top',
        height: 120,
        borderRadius: 5,
    },
    fileContainer: {
        marginTop: 20,
        alignItems: 'center',
    },

    fileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#4CAF50',
    },
    uploadIcon: {
        marginRight: 10,
    },
    radioButtonContainer: {
        marginBottom: moderateScale(16),
    },
    radioButtonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(8),
        color: 'gold',
    },
    radioButtonLabel: {
        fontSize: 12,
        marginHorizontal: moderateScale(5),
        paddingRight: moderateScale(20),

    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 12,
        borderColor: '#F16877',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        margin: 10,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    uploadProgressContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    uploadProgressText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#F16877',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#F16877',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownStyle: {
        height: 40,
        borderColor: '#F16877',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        padding: 8,
    },
    dropdownTextStyle: {
        fontSize: 16,
    },
    dropdownStyle: {
        height: 40,
        borderColor: '#F16877',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        padding: 8,
    },
    dropdownTextStyle: {
        fontSize: 16,
    },
    dropdownRow: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: 'white',
    },
    selectedDropdownRow: {
        backgroundColor: '#F16877',
    },
    dropdownText: {
        fontSize: 16,
    },

    // page two

    questionContainer: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F16877',
        paddingBottom: 16,
    },

    questionText: {
        fontSize: 14,
        marginBottom: 8,
    },

    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    optionLabel: {
        fontSize: 12,
        marginHorizontal: 5,
        paddingRight: 20,
        color: '#333', // Ubah sesuai dengan warna teks yang Anda inginkan
    },
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    checkBoxLabel: {
        fontSize: 14,
        marginLeft: 8,
    },

});

export default FormInput;
