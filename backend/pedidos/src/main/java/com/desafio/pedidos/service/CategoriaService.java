package com.desafio.pedidos.service;

import com.desafio.pedidos.dto.CategoriaDTO;
import com.desafio.pedidos.exception.BusinessException;
import com.desafio.pedidos.exception.ResourceNotFoundException;
import com.desafio.pedidos.model.Categoria;
import com.desafio.pedidos.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public CategoriaDTO criarCategoria(CategoriaDTO categoriaDTO) {
        // Validação: nome obrigatório (já feita pelo validation)
        // Decisão: Adotamos unicidade de nome para evitar duplicação
        if (categoriaRepository.existsByNome(categoriaDTO.getNome())) {
            throw new BusinessException("Já existe uma categoria com o nome: " + categoriaDTO.getNome());
        }
        
        Categoria categoria = new Categoria();
        categoria.setNome(categoriaDTO.getNome());
        
        Categoria saved = categoriaRepository.save(categoria);
        return new CategoriaDTO(saved.getId(), saved.getNome());
    }
    
    public List<CategoriaDTO> listarCategorias() {
        return categoriaRepository.findAll().stream()
                .map(c -> new CategoriaDTO(c.getId(), c.getNome()))
                .collect(Collectors.toList());
    }
    
    public Categoria buscarCategoriaPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com ID: " + id));
    }
}