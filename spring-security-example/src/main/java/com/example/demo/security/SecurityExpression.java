package com.example.demo.security;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.Map;

public class SecurityExpression extends SecurityExpressionRoot
        implements MethodSecurityExpressionOperations {


    public SecurityExpression(Authentication authentication) {
        super(authentication);
    }

    public boolean customPerm(String permissionName) {
        KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) this.authentication;
        KeycloakPrincipal principal = (KeycloakPrincipal) token.getPrincipal();

        Map<String, Object> otherClaims = principal.getKeycloakSecurityContext().getToken().getOtherClaims();
        if (otherClaims != null) {
            ArrayList<String> customPermission = (ArrayList) otherClaims.get("CLAIM_TEST");
            return customPermission.contains(permissionName);
        }

        return false;
    }

    @Override
    public void setFilterObject(Object o) {

    }

    @Override
    public Object getFilterObject() {
        return null;
    }

    @Override
    public void setReturnObject(Object o) {

    }

    @Override
    public Object getReturnObject() {
        return null;
    }

    @Override
    public Object getThis() {
        return null;
    }
}
