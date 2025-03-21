INSERT INTO TB_USER
(NAME, EMAIL, PASSWORD, CPF, CREATED_AT, UPDATED_AT, CREATED_BY, UPDATED_BY, ACTIVE)
VALUES
(
    'Admin', 
    'admin@gmail.com', 
    '$2b$10$e/dCMzT0dXDkdYloj4KMPeRCmD6cjYrKoWw1hdazuJSkBpSwzXw2u', 
    '00000000000',
    NOW(), 
    NOW(), 
    NULL, 
    NULL, 
    TRUE
);