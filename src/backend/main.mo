import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import MixinStorage "blob-storage/Mixin";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  public type LegalAnalysis = {
    summary : Text;
    legal_issues : [Text];
    law_sections : [Text];
    plaintiff_strength : Text;
    defendant_strength : Text;
    strong_points : [Text];
    weak_points : [Text];
    risk_level : Text;
    disclaimer : Text;
  };

  public type DocumentData = {
    fileName : Text;
    fileType : Text;
    fileSize : Nat;
    content : Text;
  };

  public type UserData = {
    id : Text;
    uploadedDocuments : [DocumentData];
    analysisResults : [LegalAnalysis];
    questions : [Text];
  };

  type UserDTO = {
    id : Text;
    uploadedDocuments : [DocumentData];
    analysisResults : [LegalAnalysis];
    questions : [Text];
  };

  let userDb = Map.empty<Text, UserData>();

  module LegalAnalysis {
    public func fromLiteral(analysis : LegalAnalysis) : LegalAnalysis {
      analysis;
    };

    public func toLiteral(analysis : LegalAnalysis) : LegalAnalysis {
      analysis;
    };
  };

  module DocumentData {
    public func fromLiteral(data : DocumentData) : DocumentData {
      data;
    };

    public func toLiteral(data : DocumentData) : DocumentData {
      data;
    };
  };

  module UserData {
    public func fromLiteral(data : UserDTO) : UserData {
      {
        id = data.id;
        uploadedDocuments = data.uploadedDocuments.map(DocumentData.fromLiteral);
        analysisResults = data.analysisResults.map(LegalAnalysis.fromLiteral);
        questions = data.questions;
      };
    };

    public func toLiteral(data : UserData) : UserDTO {
      {
        id = data.id;
        uploadedDocuments = data.uploadedDocuments.map(DocumentData.toLiteral);
        analysisResults = data.analysisResults.map(LegalAnalysis.toLiteral);
        questions = data.questions;
      };
    };
  };

  public query ({ caller }) func getUserData(id : Text) : async ?UserDTO {
    switch (userDb.get(id)) {
      case (null) { null };
      case (?data) { ?UserData.toLiteral(data) };
    };
  };

  public shared ({ caller }) func saveUserData(input : UserDTO) : async UserDTO {
    let userData = UserData.fromLiteral(input);
    userDb.add(userData.id, userData);
    input;
  };

  public shared ({ caller }) func updateUserData(id : Text, update : UserDTO) : async UserDTO {
    switch (userDb.get(id)) {
      case (null) { Runtime.trap("No data found for id " # id) };
      case (?existingData) {
        let newData = UserData.fromLiteral(update);
        userDb.add(id, newData);
        update;
      };
    };
  };

  public shared ({ caller }) func deleteUserData(id : Text) : async () {
    if (not userDb.containsKey(id)) {
      Runtime.trap("User data cannot be deleted, because it does not exist: " # id);
    };
    userDb.remove(id);
  };

  public query ({ caller }) func getAllUserData() : async [UserDTO] {
    userDb.values().toArray().map(UserData.toLiteral);
  };
};
