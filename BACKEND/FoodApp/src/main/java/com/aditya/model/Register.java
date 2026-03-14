package com.aditya.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity

public class Register {
	@Id
	@Column(length = 10)
	@NotBlank(message="USERNAME CAN'T BE BLANK")
	private String uname;
	@Column(length = 10, nullable = false)
	@Size(min=6,max=10,message = "PASSWORD SHOULD BE BETWEEN 6 TO 10 CHARACTERS")
	private String pass;
	@Column(length = 25)
	@NotBlank(message="NAME CAN'T BE BLANK")
	private String nm;
	@Column(length = 30)
	@Email(message = "ENTER EMAIL IN PROPER FORMAT")
	private String email;
	@Column(length = 10)
	@NotBlank(message="PLEASE ENTER PHONE NUMBER")
	private String phno;
	public Register() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Register(String uname, String pass, String nm, String email, String phno) {
		super();
		this.uname = uname;
		this.pass = pass;
		this.nm = nm;
		this.email = email;
		this.phno = phno;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getNm() {
		return nm;
	}
	public void setNm(String nm) {
		this.nm = nm;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhno() {
		return phno;
	}
	public void setPhno(String phno) {
		this.phno = phno;
	}
	@Override
	public String toString() {
		return "Register [uname=" + uname + ", pass=" + pass + ", nm=" + nm + ", email=" + email + ", phno=" + phno
				+ "]";
	}

}