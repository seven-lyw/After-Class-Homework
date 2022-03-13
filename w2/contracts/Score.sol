// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Score {


    address public teacher;

    uint public maxStore = 100;

    mapping(address=>Student) public studentScore;

    struct Student{
        address student;
        uint score;
    }


    constructor(){
        teacher = msg.sender;
    }

    function addScore(address  stu,uint sc)external onlyTeacher{
        console.log("addScore address is:",stu);
        require(sc<100,"score too max");
        require(studentScore[stu].score<=0,"stu is exist!");
        studentScore[stu] = Student(stu,sc);
    }

    function editScore(address  stu,uint sc)external onlyTeacher{
        require(sc<100,"score too max");
        Student memory stu2 = studentScore[stu];
        stu2.score = sc;
        studentScore[stu] = stu2;
    }

    modifier onlyTeacher(){
        console.log("starting modifier....");
        require( tx.origin == teacher,"not teacher");
        _;
    }
}


interface IScore{

    function addScore(address  stu,uint sc)external;

    function editScore(address  stu,uint sc)external;

}

contract Teacher{

    function editScore2(address scoreContract,address  stu,uint sc)public{
        IScore iScore = IScore(scoreContract);
        iScore.editScore(stu,sc);
    }

}