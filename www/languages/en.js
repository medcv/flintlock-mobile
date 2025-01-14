(function() {
  var translations = {
    'title_tracking': 'Tracking',
    'title_reports': 'Reports',
    'title_report_create': 'Create Report',
    'title_website': 'Website',
    'title_search': 'Search',
    'title_create': 'Create Person',
    'title_edit': 'Edit Person',
    'title_details': 'Details',
    'title_shelters': 'Shelters',
    'title_shelter_details': 'Shelter Details',
    'title_settings': 'Settings',
    'title_login': 'Flintlock Login',
    'title_picture_dialog': 'Picture',
    'login_username': 'Username',
    'login_password': 'Password',
    'login_message': 'Log in with your Flintlock account',
    'dialog_confirm_cancel': 'Are you sure you want to cancel?',
    'dialog_confirm_delete': 'Are you sure you want to delete this person?',
    'dialog_retrieving_list': 'Retrieving list of all people..',
    'dialog_retrieving_list_complete': 'List retrieval completed!',
    'dialog_error_person_exists': 'Person already exists!',
    'dialog_error_person_no_name': 'Please enter at least a name to upload a new person.',
    'dialog_error_username_password': 'Please enter a Username and Password!',
    'dialog_error_username': 'Please enter a Username!',
    'dialog_error_password': 'Please enter a Password!',
    'dialog_photo_uploaded': 'Photo has been uploaded for ',
    'dialog_person_uploaded': ' has been successfully uploaded!',
    'dialog_person_exists': 'Person already exists!',
    'modal_picture_take_picture': 'Take Photo',
    'modal_picture_choose_from_library': 'Choose From Library',
    'modal_picture_remove_picture': 'Remove Picture',
    'modal_cancel': 'Cancel',
    'tab_tracking': 'Tracking',
    'tab_reports': 'Reports',
    'tab_website': 'Website',
    'tab_search': 'Search',
    'tab_create': 'Create',
    'tab_shelter': 'Shelter',
    'tab_settings': 'Settings',
    'tab_edit': 'Edit',
    'tab_delete': 'Delete',
    'tab_save': 'Save',
    'tab_cancel': 'Cancel',
    'tab_back': 'Back',
    'person_given_name': 'Given Name',
    'person_family_name': 'Family Name',
    'person_fathers_given_name': 'Fathers Given Name',
    'person_mothers_given_name': 'Mothers Given Name',
    'person_age': 'Age',
    'person_date_of_birth': 'Date of Birth',
    'person_street_and_number': 'Address',
    'person_city': 'City',
    'person_neighborhood': 'Neighborhood',
    'person_description': 'Description',
    'person_gender': 'Gender',
    'person_not_specified': 'Not Specified',
    'person_gender_male': 'Male',
    'person_gender_female': 'Female',
    'person_gender_other': 'Other',
    'person_injury': 'Injury',
    'person_injury_not_injured': 'Not Injured',
    'person_injury_moderate': 'Moderate',
    'person_injury_severe': 'Severe',
    'person_nationality': 'Nationality',
    'person_nationality_english': 'English',
    'person_nationality_african': 'African',
    'person_nationality_asian': 'Asian',
    'person_phone_number': 'Phone Number',
    'person_barcode': 'Barcode',
    'person_current_shelter': 'Shelter',
    'button_save': 'Save',
    'button_login': 'Log in',
    'button_save_credentials_without_verification': 'Save Without Verification',
    'button_change_credentials': 'Change Credentials',
    'button_request_account': 'Or request an account',
    'button_shelter_search': 'Back to Shelter Map',
    'search_searchfield': 'Search',
    'search_age': 'Age',
    'settings_cache_photos': 'Cache Photos',
    'tracking_toggle': 'Tracking',
    'tracking_mayday': 'Mayday!',
    'settings_language': 'Language',
    'settings_language_english': 'English',
    'settings_language_spanish': 'Spanish',
    'settings_server': 'Server',
    'settings_server_protocol': 'Protocol',
    'error_retrieving_info': 'Retrieving information..',
    'error_invalid_credentials': 'Incorrect Username or Password!',
    'error_server_not_found': 'Server not found. Make sure you are connected and server address is valid.',
    'error_connecting_server': 'A problem occurred when connecting to the server.',
    'error_no_results': 'No results found.',
    'error_couldnt_get_results': 'Could not get results. Please try again.',
    'error_could_not_get_django_apikey': 'Could not get Django api key',
    'error_sending': 'Error Sending',
    'loading_face_search': 'Loading Best Possible Matches..'
  };

  var module = angular.module('vida-translations-en', ['pascalprecht.translate']);

  module.config(function($translateProvider) {
    $translateProvider.translations('en', translations);
  });

}());
